import { useSession } from "next-auth/react";
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { getServerSession } from "next-auth/next";
import React from 'react';
import prisma from "/lib/prismadb";

import styles from '/styles/App.module.css';
import Layout from "/components/app/layout";
import Header from '/components/app/header';
import Sidenav from "/components/app/sidenav";
import Sidemenu from "/components/app/sidemenu";
import Chat from "/components/app/chat";
import Popup from "/components/app/popup";
import Button from "/components/app/button";

export default function Homepage(props) {
    const {data: session ,status} = useSession({required: true,});
    const [showPopup, setShowPopup] = React.useState("none");

    return (
        <div className={styles.wrapper}>
            {(showPopup != "none")&&(<Popup display={showPopup}><Button onClick={() => setShowPopup("none")} title="Cancel"/></Popup>)}
            <Layout>
                <Sidenav chats={props.chats} id={props.id}>
                    <Button onClick={() => setShowPopup("add")} title="Add" image="/icons/plus.png" imageDark="/icons/plusDark.png"/>
                </Sidenav>
                <div className={styles.main}>
                    <Header chatName={"Welcome, " + ((status === "loading")?("loading"):(session.user.name)) + "!"}/>
                    <Layout>

                    </Layout>
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
        include: { chats: true },
    })

    return {
        props: {
            chats: user.chats,
            userId: user.id,
        }
    }
}