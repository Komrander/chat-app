import { authOptions } from '/pages/api/auth/[...nextauth]';
import { getServerSession } from "next-auth/next";
import React, {useState} from 'react';
import prisma from "/lib/prismadb";
import Router from "next/router"

import styles from '/styles/App.module.css';
import Header from '/components/app/header';
import Sidenav from "/components/app/sidenav";
import Sidemenu from "/components/app/sidemenu";
import Chat from "/components/app/chat";
import Popup from "/components/app/popup";
import Button from "/components/app/button";
import Icon from '/components/app/icon';

export default function Homepage(props) {
    const [chat, setChat] = useState(props.chat);
    const [showPopup, setShowPopup] = useState("none");
    const dynamicRoute = Router.useRouter().asPath;
    React.useEffect(() => setShowPopup("none"), [dynamicRoute]);

    React.useEffect(() => {
        const interval = setInterval(async ()=>{
            try {
                const response = await fetch("/api/chat", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: props.id }),
                });

                const chatData = await response.json();
                
                if (response.status != 200) {
                    clearInterval(interval);
                } else {
                    console.log(chatData)
                    setChat(chatData);
                }
            } catch (err) {
                console.log("Error while fetching data: "+err);
                clearInterval(interval);
            }
        },5000)
    }, [props.id])

    return (
        <div className={styles.wrapper}>
            {(showPopup != "none")&&(<Popup display={showPopup}><Button style="grey" onClick={() => setShowPopup("none")} title="Cancel"/></Popup>)}
            <div className={styles.container}>
                <Sidenav chats={props.chats} id={props.id}>
                    <Button onClick={() => setShowPopup("add")} title="Add" image="/icons/plus.png" imageDark="/icons/plusDark.png"/>
                </Sidenav>
                <div className={styles.main}>
                    <Header chat={chat} chatName={props.chatName}>
                        <Icon onClick={() => setShowPopup("settings")} image="/icons/settings.png" imageDark="/icons/settingsDark.png"/>
                    </Header>
                    <div className={styles.chatContainer}>
                        <Chat chat={chat} chatName={props.chatName} userId={props.userId}/>
                        <Sidemenu chat={chat} chatName={props.chatName}>
                            <Button onClick={() => setShowPopup("invite")} title="Invite user"/>
                        </Sidemenu>
                    </div>
                </div>
            </div>
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
                orderBy: {
                    date: "desc",
                },
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