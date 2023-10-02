import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import { GetServerSideProps } from "next";
import { useState } from "react";

import prisma from "@/lib/prisma";

import styles from "@/styles/App.module.css";

import Header from "@/components/header/header";
import Sidenav from "@/components/sidenav/sidenav";
import Popup from "@/components/popup/popup";

import { FullChat, PopupDisplay } from "@/types/types";
import { PopupContext, PopupContextType } from "@/contexts/popupContext";

import Head from "next/head";

interface HomepageProps {
    chats: FullChat[];
    userId: number;
    username: string;
}

export default function Homepage(props:HomepageProps) {
    const [popupDisplay, setPopupDisplay] = useState<PopupDisplay>("none");
    
    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <div className={styles.wrapper}>
                <PopupContext.Provider value={{ popupDisplay, setPopupDisplay }}>
                    <Popup/>
                    <div className={styles.container}>
                        <Sidenav chats={props.chats}/>
                        <div className={styles.main}>
                            <Header/>
                            <div className={styles.welcomeContainer}>
                                <h1 className={styles.welcomeTitle}>Welcome, {props.username}!</h1>
                                <p className={styles.welcomeText}>
                                    Start a new chat with the add button or select an existing chat on the left panel.
                                    <br/><br/>
                                    Use the settings icon to logout or change your name and password.
                                </p>
                            </div>
                        </div>
                    </div>
                </PopupContext.Provider>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (!session?.user?.email) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        }
    }

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

    if (user) {
        return {
            props: {
                chats: JSON.parse(JSON.stringify(user.chats)),
                userId: user.id,
                username: user.name,
            }
        }
    } else {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        }
    }
}