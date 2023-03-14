import { useSession } from "next-auth/react";
import styles from './sidemenu.module.css';

import Button from './button';

export default function Sidemenu() {
    const {data:session, status} = useSession();

    if (status === "loading") {
        return "Loading or not authenticated..."
    }

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>Details</h1>
            </div>
            <div className={styles.titleContainer}>
                <h1 className={styles.subtitle}>About</h1>
            </div>
            <div className={styles.infoContainer}>
                <h1 className={styles.infoTitle}>group 1</h1>
                <p className={styles.infoSubtitle}>group description</p>
            </div>
            <div className={styles.buttonContainer}>
                <Button title="Invite friend"/>
                <Button title="Leave group" style="negative"/>
            </div>
            <div className={styles.titleContainer}>
                <h1 className={styles.subtitle}>Members - 3</h1>
            </div>
        </div>
    )
}