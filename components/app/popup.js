import { signOut, useSession } from "next-auth/react";
import React from 'react';
import styles from './popup.module.css';

import Button from './button';

export default function Popup(props) {
    const {data:session, status} = useSession();
    const [popupState, setPopupState] = React.useState(0);

    switch (popupState) {
        case 0:
            return (
                <div className={styles.pageCover}>
                    <div className={styles.container}>
                        <h1 className={styles.title}>Add a new chat</h1>
                        <button className={styles.button} onClick={() => setPopupState(1)}>Create group</button>
                        <button className={styles.button} onClick={() => setPopupState(2)}>Send friend request</button>
                        {props.children}
                    </div>
                </div>
            );
        case 1:
            return (
                <div className={styles.pageCover}>
                    <div className={styles.container}>
                        <h1 className={styles.title}>Create a new group</h1>
                        <form action="/api/group" method="post">
                            <input name="name" type="text" placeholder="Group name"></input>
                            <div>
                                <Button onClick={() => setPopupState(0)} title="Cancel"/>
                                <Button type="submit" title="Create new group"/>
                            </div>
                        </form>
                    </div>
                </div>
            );
        case 2:
            return (
                <div className={styles.pageCover}>
                    <div className={styles.container}>
                        <h1 className={styles.title}>Send friend request</h1>
                        <input type="text" placeholder="Username"></input>
                        <div>
                            <Button onClick={() => setPopupState(0)} title="Cancel"/>
                            <Button title="Send friend request"/>
                        </div>
                    </div>
                </div>
            )
        default:
            return;
    }
}