import { authOptions } from '/pages/api/auth/[...nextauth]';
import { getServerSession } from "next-auth/next";
import React from 'react';
import prisma from "/lib/prismadb";

import styles from '/styles/App.module.css';
import Layout from "/components/app/layout";
import Header from '/components/app/header';
import Sidenav from "/components/app/sidenav";
import Popup from "/components/app/popup";
import Button from "/components/app/button";
import Icon from "/components/app/icon";

export default function Homepage(props) {
    const [showPopup, setShowPopup] = React.useState("none");

    return (
        <div className={styles.wrapper}>
            {(showPopup != "none")&&(<Popup display={showPopup}><Button style="grey" onClick={() => setShowPopup("none")} title="Cancel"/></Popup>)}
            <Layout>
                <Sidenav chats={props.chats} id={props.id}>
                    <Button onClick={() => setShowPopup("add")} title="Add" image="/icons/plus.png" imageDark="/icons/plusDark.png"/>
                </Sidenav>
                <div className={styles.main}>
                    <Header chat={props.chat}>
                        <Icon onClick={() => setShowPopup("settings")} image="/icons/settings.png" imageDark="/icons/settingsDark.png"/>
                    </Header>
                    <h1 className={styles.welcomeTitle}>Welcome, {props.username}!</h1>
                    <p>
                        Start a new chat with the add button or select an existing chat on the left panel.
                        <br/><br/>
                        Use the settings icon to logout or change your name and password.
                    </p>
                </div>
            </Layout>
        </div>
    )
}

export async function getServerSideProps(context) {
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

    return {
        props: {
            chats: JSON.parse(JSON.stringify(user.chats)),
            userId: user.id,
            username: user.name,
        }
    }
}