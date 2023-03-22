import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import prisma from "../../lib/prismadb";

import styles from '../../styles/App.module.css';
import Layout from "../../components/app/layout";
import Header from '../../components/app/header';
import Sidenav from "../../components/app/sidenav";
import Sidemenu from "../../components/app/sidemenu";
import Chat from "../../components/app/chat";
import Popup from "../../components/app/popup";

export default function Homepage(props) {
    const {data: session} = useSession({required: true,});

    return (
        <div className={styles.wrapper}>
            <Popup/>
            <Layout>
                <Sidenav chats={props.chats}/>
                <div className={styles.main}>
                    <Header/>
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
    const session = await getServerSession(context.req, context.res);

    const user = await prisma.user.findFirst({
        where: { id: session.id },
        include: { chats: true },
    })

    return {
        props: {
            chats: user.chats
        }
    }
}