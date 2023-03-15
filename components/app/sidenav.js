import { useSession } from "next-auth/react";
import styles from './sidenav.module.css';

import Button from './button';
import Profile from './profile';

export default function Sidenav() {
    const {data:session, status} = useSession();

    if (status === "loading") {
        return "Loading or not authenticated..."
    }

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>Chats</h1>
                <Button title="Add" image="icons/plus.png" imageDark="icons/plusDark.png"/>
            </div>
            <div className={styles.navButton}>
                <Profile style="small"/>
                <div className={styles.navButtonContainer}>
                    <div className={styles.navButtonHeader}>
                        <h1 className={styles.navButtonNameHighlight}>friend 1</h1>
                        <h1 className={styles.navButtonTimeHighlight}>2 minutes ago</h1>
                    </div>
                    <div className={styles.navButtonContent}>
                        <h1 className={styles.navButtonMessageHighlight}>Supporting line text lorem ipsum dolor sit amet, consectetur</h1>
                        <div className={styles.navButtonNotification}>1</div>
                    </div>
                </div>
            </div>
            <div className={styles.navButton}>
                <Profile style="small"/>
                <div className={styles.navButtonContainer}>
                    <div className={styles.navButtonHeader}>
                        <h1 className={styles.navButtonName}>friend 1</h1>
                        <h1 className={styles.navButtonTime}>40 minutes ago</h1>
                    </div>
                    <div className={styles.navButtonContent}>
                        <h1 className={styles.navButtonMessage}>You: bye</h1>
                    </div>
                </div>
            </div>
            <div className={styles.navButtonHighlight}>
                <Profile style="small"/>
                <div className={styles.navButtonContainer}>
                    <div className={styles.navButtonHeader}>
                        <h1 className={styles.navButtonNameHighlight}>group 1</h1>
                        <h1 className={styles.navButtonTimeHighlight}>4 hours ago</h1>
                    </div>
                    <div className={styles.navButtonContent}>
                        <h1 className={styles.navButtonMessageHighlight}>Supporting line text lorem ipsum dolor sit amet, consectetur</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}