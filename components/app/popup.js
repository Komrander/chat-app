import React from 'react';
import styles from './popup.module.css';
import Router from "next/router";

import Button from './button';

export default function Popup(props) {
    const [popupDisplay, setPopupDisplay] = React.useState(props.display);

    async function handleAddGroup(e) {
        e.preventDefault();
        const name = e.target.name.value;
        const res = await fetch("/api/group", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name }),
        });
        const result = await res.json();
        console.log(result);
        if (res.status == 200) {
            Router.push('/app/chats/'+result.id);
        } else {
            alert("Error");
        }
    }

    async function handleAddDirect(e) {
        e.preventDefault();
        const email = e.target.email.value;
        const res = await fetch("/api/direct", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
        });
        const result = await res.json();
        console.log(result);
        if (res.status == 200) {
            Router.push('/app/chats/'+result.id);
        } else {
            alert("Error");
        }
    }

    async function handleInvite(e) {
        e.preventDefault();
        const email = e.target.email.value;
        const res = await fetch("/api/invite", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
        });
        const result = await res.json();
        console.log(result);
        if (res.status == 200) {
            Router.reload(window.location.pathname)
        } else {
            alert("Error");
        }
    }

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
                        <form onSubmit={handleAddGroup}>
                            <input className={styles.input} name="name" type="text" placeholder="Group name"></input>
                            <div className={styles.buttonContainer}>
                                <Button style="grey" onClick={() => setPopupDisplay("add")} title="Cancel"/>
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
                        <form onSubmit={handleAddDirect}>
                            <input className={styles.input} name="email" type="email" placeholder="Email"></input>
                            <div className={styles.buttonContainer}>
                                <Button style="grey" onClick={() => setPopupDisplay("add")} title="Cancel"/>
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
                        <form onSubmit={handleInvite}>
                            <input className={styles.input} name="email" type="email" placeholder="Email"></input>
                            <div className={styles.buttonContainer}>
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