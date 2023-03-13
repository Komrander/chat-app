import { useSession } from "next-auth/react";
import prisma from '../../../lib/prismadb';
import { useRouter } from 'next/router';

import styles from '../../styles/App.module.css';
import Layout from "../../../components/app/layout";
import Header from '../../../components/app/header';
import Sidenav from "../../../components/app/sidenav";

export default function Homepage() {
    const {data:session, status} = useSession({required: true,});

    return (
        <div className={styles.wrapper}>
            <Layout>
            <Sidenav/>
            <div className={styles.main}>
                <Header/>
            </div>
            </Layout>
        </div>
    )
}

export async function getServerSideProps() {
    
}