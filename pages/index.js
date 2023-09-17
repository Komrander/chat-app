import { signIn, signOut, useSession } from "next-auth/react";
import styles from '/styles/Home.module.css';
import Router from "next/router";

import Image from 'next/image';
import Button from '/components/button';

export default function LandingPage() {
    const {data:session, status} = useSession();

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.nav}>
                    <Image width="166" height="40" alt="" src="/logo.svg"/>
                    {(status!="authenticated")&&(<Button title="Login" onClick={() => signIn()}>Sign in</Button>)}
                </div>
            </div>
            <div className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.registerContainer}>
                        <h1 className={styles.registerTitle}>Create an account on<br/> WaveChat</h1>
                        <h1 className={styles.registerText}>Chat with your friends, family and coworkers</h1>
                        {(status=="authenticated")
                        ?(<Button title="Open the application" onClick={() => Router.push('/app')}>Sign in</Button>)
                        :(<Button title="Create an account" onClick={() => Router.push('/register')}>Sign in</Button>)}
                    </div>
                    <Image className={styles.showcase} width="570" height="400" alt="" src="/showcase.png"/>
                </div>
                <div className={styles.container}>
                    <div className={styles.card}>
                        <Image width="56" height="56" alt="" src="/icons/menu.png"/>
                        <h1 className={styles.cardTitle}>Simple interface</h1>
                    </div>
                    <div className={styles.card}>
                        <Image width="56" height="56" alt="" src="/icons/comment.png"/>
                        <h1 className={styles.cardTitle}>Message your friends at any time</h1>
                    </div>
                    <div className={styles.card}>
                        <Image width="56" height="56" alt="" src="/icons/group.png"/>
                        <h1 className={styles.cardTitle}>Create group chats</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}