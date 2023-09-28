import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import { GetServerSideProps } from "next";
import { useState } from "react";

import prisma from "@/lib/prisma";

import {faGear, faPlus} from "@fortawesome/free-solid-svg-icons";

import styles from "@/styles/App.module.css";

import Header from "@/components/header/header";
import Sidenav from "@/components/sidenav/sidenav";
import Sidemenu from "@/components/sidemenu/sidemenu";
import Chat from "@/components/chat/chat";
import Popup from "@/components/popup/popup";
import Button from "@/components/button/button";
import Icon from "@/components/icon/icon";
import ChatInput from "@/components/chatInput/chatInput";

interface HomepageProps {
    chats: object;
    chat: object;
    id: number;
    userId: number;
    username: string;
    chatName: string;
}

export default function Homepage(props:HomepageProps) {
    const [popupDisplay, setPopupDisplay] = useState("none");

    return (
        <div className={styles.wrapper}>
            <Popup display={popupDisplay} setPopupState={setPopupDisplay}/>
            <div className={styles.container}>
                <Sidenav chats={props.chats} id={props.id}>
                    <Button onClick={() => setPopupDisplay("add")} title="Add" icon={faPlus}/>
                </Sidenav>
                <div className={styles.main}>
                    <Header chat={props.chat} chatName={props.chatName}>
                        <Icon onClick={() => setPopupDisplay("settings")} icon={faGear}/>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (!session?.user?.email || typeof(context.query.id) !== "string") {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        }
    }

    const id = parseInt(context.query.id);
    const email = session.user.email as string;

    const user = await prisma.user.findUnique({
        where: { email: email },
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
                                email: email,
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

    if (!user) {
        return { notFound: true };
    }

    const chat = await prisma.chat.findFirst({
        where: { 
            id: id,
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

    
    let chatName;
    if (chat.type === "DIRECT") {
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