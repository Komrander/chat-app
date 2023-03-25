import { signOut, useSession } from "next-auth/react";
import React from 'react';
import styles from './popup.module.css';

import Button from './button';

export default function Popup(props) {
    const [popupDisplay, setPopupDisplay] = React.useState(props.display);

    switch (popupDisplay) {
        case "add":
            return (
                <div className={styles.pageCover}>
                    <div className={styles.container}>
                        <h1 className={styles.title}>Add a new chat</h1>
                        <button className={styles.button} onClick={() => setPopupDisplay("addGroup")}>Create group</button>
                        <button className={styles.button} onClick={() => setPopupDisplay("addDirect")}>Start direct chat</button>
                        {props.children}
                    </div>
                </div>
            );
        case "addGroup":
            return (
                <div className={styles.pageCover}>
                    <div className={styles.container}>
                        <h1 className={styles.title}>Create a new group</h1>
                        <form action="/api/group" method="post">
                            <input name="name" type="text" placeholder="Group name"></input>
                            <div>
                                <Button onClick={() => setPopupDisplay("add")} title="Cancel"/>
                                <Button type="submit" title="Create new group"/>
                            </div>
                        </form>
                    </div>
                </div>
            );
        case "addDirect":
            return (
                <div className={styles.pageCover}>
                    <div className={styles.container}>
                        <h1 className={styles.title}>Start new direct chat</h1>
                        <form action="/api/direct" method="post">
                            <input name="email" type="email" placeholder="Email"></input>
                            <div>
                                <Button onClick={() => setPopupDisplay("add")} title="Cancel"/>
                                <Button type="submit" title="Start direct chat"/>
                            </div>
                        </form>
                    </div>
                </div>
            )
        case "invite":
            return (
                <div className={styles.pageCover}>
                    <div className={styles.container}>
                        <h1 className={styles.title}>Send invite</h1>
                        <form action="/api/invite" method="post">
                            <input name="email" type="email" placeholder="Email"></input>
                            <div>
                                {props.children}
                                <Button type="submit" title="Send invite"/>
                            </div>
                        </form>
                    </div>
                </div>
            )
        default:
            return;
    }
}