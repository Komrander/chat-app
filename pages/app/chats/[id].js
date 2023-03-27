import { authOptions } from 'pages/api/auth/[...nextauth]';
import { getServerSession } from "next-auth/next";
import React from 'react';
import prisma from "/lib/prismadb";
import Router from "next/router"

import styles from '/styles/App.module.css';
import Layout from "/components/app/layout";
import Header from '/components/app/header';
import Sidenav from "/components/app/sidenav";
import Sidemenu from "/components/app/sidemenu";
import Chat from "/components/app/chat";
import Popup from "/components/app/popup";
import Button from "/components/app/button";
import Icon from '/components/app/icon';

export default function Homepage(props) {
    const [showPopup, setShowPopup] = React.useState("none");
    const dynamicRoute = Router.useRouter().asPath;
    React.useEffect(() => setShowPopup("none"), [dynamicRoute]);

    return (
        <div className={styles.wrapper}>
            {(showPopup != "none")&&(<Popup display={showPopup}><Button style="grey" onClick={() => setShowPopup("none")} title="Cancel"/></Popup>)}
            <Layout>
                <Sidenav chats={props.chats} id={props.id}>
                    <Button onClick={() => setShowPopup("add")} title="Add" image="/icons/plus.png" imageDark="/icons/plusDark.png"/>
                </Sidenav>
                <div className={styles.main}>
                    <Header chat={props.chat} chatName={props.chatName}>
                        <Icon onClick={() => setShowPopup("settings")} image="/icons/settings.png" imageDark="/icons/settingsDark.png"/>
                    </Header>
                    <Layout>
                        <Chat chat={props.chat} chatName={props.chatName} userId={props.userId}/>
                        <Sidemenu chat={props.chat} chatName={props.chatName}>
                            <Button onClick={() => setShowPopup("invite")} title="Invite user"/>
                        </Sidemenu>
                    </Layout>
                </div>
            </Layout>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.query;
    const session = await getServerSession(context.req, context.res, authOptions);

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
            chats: {
                include: {
                    messages: {
                        orderBy: {
                            date: "desc",
                        },
                        take: 1,
                    },
                    participants: {
                        where: {
                            NOT: {
                                email: session.user.email,
                            },
                        },
                        select: {
                            name: true,
                        },
                        take: 1,
                    },
                },
            },
        },
    })

    const chat = await prisma.chat.findFirst({
        where: { 
            id: parseInt(id),
            participants: {
                some: {
                    id: user.id,
                },
            },
        },
        include: {
            participants: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            messages: {
                include: {
                    user: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
    })

    if (!chat) {
        return { notFound: true };
    }

    
    var chatName;
    if (chat.type == "DIRECT") {
        if (chat.participants[0].email == session.user.email) {
            chatName = chat.participants[1].name;
        } else {
            chatName = chat.participants[0].name;
        }
    } else {
        chatName = chat.name;
    }

    return {
        props: {
            chats: JSON.parse(JSON.stringify(user.chats)),
            chat: JSON.parse(JSON.stringify(chat)),
            id: id,
            userId: user.id,
            username: user.name,
            chatName: chatName,
        }
    }
}