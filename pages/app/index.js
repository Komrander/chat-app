import { useSession } from "next-auth/react";

import styles from '../../styles/App.module.css';
import Layout from "../../components/app/layout";
import Header from '../../components/app/header';
import Sidenav from "../../components/app/sidenav";
import Sidemenu from "../../components/app/sidemenu";
import Chat from "../../components/app/chat";

export default function Homepage() {
    const {data:session, status} = useSession({required: true,});

    return (
        <div className={styles.wrapper}>
            <Layout>
                <Sidenav/>
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