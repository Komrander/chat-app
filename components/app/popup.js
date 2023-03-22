import { signOut, useSession } from "next-auth/react";
import styles from './popup.module.css';

import Button from './button';

export default function Popup(props) {
    const {data:session, status} = useSession();

    return (
        <div className={styles.pageCover}>
            <div className={styles.container}>
                <h1 className={styles.title}>Add new chat</h1>
                <button className={styles.button}>Create group</button>
                <button className={styles.button}>Send friend request</button>
                <Button title="Cancel"/>
            </div>
        </div>
    )
}