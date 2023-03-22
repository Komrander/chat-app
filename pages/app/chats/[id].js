import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import React from 'react';
import prisma from "../../../lib/prismadb";

import styles from '../../../styles/App.module.css';
import Layout from "../../../components/app/layout";
import Header from '../../../components/app/header';
import Sidenav from "../../../components/app/sidenav";
import Sidemenu from "../../../components/app/sidemenu";
import Chat from "../../../components/app/chat";
import Popup from "../../../components/app/popup";
import Button from "../../../components/app/button";

export default function Homepage(props) {
    const {data: session} = useSession({required: true,});
    const [showPopup, setShowPopup] = React.useState(false);

    function handleChangePopup() {
        setShowPopup(!showPopup);
    }

    return (
        <div className={styles.wrapper}>
            {(showPopup)&&(<Popup><Button onClick={handleChangePopup} title="Cancel"/></Popup>)}
            <Layout>
                <Sidenav chats={props.chats} id={props.id} onClick={handleChangePopup} >
                    <Button onClick={handleChangePopup} title="Add" image="/icons/plus.png" imageDark="/icons/plusDark.png"/>
                </Sidenav>
                <div className={styles.main}>
                    <Header chatName={props.chat.name}/>
                    <Layout>
                        <Chat/>
                        <Sidemenu/>
                    </Layout>
                </div>
            </Layout>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.query;
    const session = await getServerSession(context.req, context.res);

    const user = await prisma.user.findFirst({
        where: { id: session.id },
        include: { chats: true },
    })

    const chat = await prisma.chat.findFirst({
        where: { id: parseInt(id) },
        include: { participants: true },
    })

    if (!chat) {
        return { notFound: true };
    }

    return {
        props: {
            chats: user.chats,
            chat: chat,
            id: id,
        }
    }
}