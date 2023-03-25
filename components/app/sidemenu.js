import { useSession } from "next-auth/react";
import styles from './sidemenu.module.css';

import Button from './button';
import Profile from './profile';

export default function Sidemenu(props) {
    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>Details</h1>
            </div>
            <div className={styles.titleContainer}>
                <h1 className={styles.subtitle}>About</h1>
            </div>
            <div className={styles.infoContainer}>
                <Profile name={props.chat.name} style="large"/>
                <h1 className={styles.infoTitle}>{props.chat.name}</h1>
                <p className={styles.infoSubtitle}>{props.chat.description}</p>
            </div>
            <div className={styles.buttonContainer}>
                {props.children}
                <form action="/api/leave" method="post">
                    <Button type="submit" title="Leave group" style="negative"/>
                </form>
            </div>
            <div className={styles.titleContainer}>
                <h1 className={styles.subtitle}>Members - {props.chat.participants.length}</h1>
            </div>
            {
                props.chat.participants.map(user =>
                    <Profile key={user.id} style="full" name={user.name}></Profile>
                )
            }
        </div>
    )
}