import { authOptions } from "/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import React, {useState} from "react";
import prisma from "/lib/prismadb";

import styles from "/styles/App.module.css";
import Header from "/components/header";
import Sidenav from "/components/sidenav";
import Sidemenu from "/components/sidemenu";
import Chat from "/components/chat";
import Popup from "/components/popup";
import Button from "/components/button";
import Icon from "/components/icon";
import ChatInput from "/components/chatInput";

export default function Homepage(props) {
    const [popupDisplay, setPopupDisplay] = useState("none");

    return (
        <div className={styles.wrapper}>
            <Popup display={popupDisplay} setPopupState={setPopupDisplay}/>
            <div className={styles.container}>
                <Sidenav chats={props.chats} id={props.id}>
                    <Button onClick={() => setPopupDisplay("add")} title="Add" image="/icons/plus.png" imageDark="/icons/plusDark.png"/>
                </Sidenav>
                <div className={styles.main}>
                    <Header chat={props.chat} chatName={props.chatName}>
                        <Icon onClick={() => setPopupDisplay("settings")} image="/icons/settings.png" imageDark="/icons/settingsDark.png"/>
                    </Header>
                    <div className={styles.chatContainer}>
                        <div className={styles.innerChatContainer}>
                            <Chat chat={props.chat} id={props.id} userId={props.userId}/>
                            <ChatInput chatName={props.chatName}/>
                        </div>
                        <Sidemenu chat={props.chat} chatName={props.chatName}>
                            <Button onClick={() => setPopupDisplay("invite")} title="Invite user"/>
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
                destination: "/",
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