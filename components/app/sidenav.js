import { useSession } from "next-auth/react";
import styles from './sidenav.module.css';
import Link from 'next/link';

import Button from './button';
import Profile from './profile';

export default function Sidenav(props) {
    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>Chats</h1>
                {props.children}
            </div>
            {
                props.chats.map(chat =>
                    <Link href={`/app/chats/${encodeURIComponent(chat.id)}`} key={chat.id}>
                        <div className={(chat.id == props.id)?(styles.navButtonHighlight):(styles.navButton)}>
                            <Profile name={chat.name} style="small"/>
                            <div className={styles.navButtonContainer}>
                                <div className={styles.navButtonHeader}>
                                    <h1 className={styles.navButtonNameHighlight}>{chat.name}</h1>
                                    <h1 className={styles.navButtonTimeHighlight}>2 minutes ago</h1>
                                </div>
                                <div className={styles.navButtonContent}>
                                    <h1 className={styles.navButtonMessageHighlight}>Supporting line text lorem ipsum dolor sit amet, consectetur</h1>
                                    <div className={styles.navButtonNotification}>1</div>
                                </div>
                            </div>
                        </div>
                    </Link>
                )
            }
        </div>
    )
}