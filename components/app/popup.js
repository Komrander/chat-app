import React from 'react';
import styles from './popup.module.css';
import Router from "next/router";
import { signOut } from "next-auth/react";

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
        if (res.status == 200) {
            Router.push('/app/chats/'+result.id);
        } else {
            alert(result.data);
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
        if (res.status == 200) {
            Router.push('/app/chats/'+result.id);
        } else {
            alert(result.data);
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
        if (res.status == 200) {
            Router.reload(window.location.pathname)
        } else {
            alert(result.data);
        }
    }

    async function handleChangeName(e) {
        e.preventDefault();
        const name = e.target.name.value;
        const res = await fetch("/api/name", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name }),
        });
        const result = await res.json();
        if (res.status == 200) {
            Router.reload(window.location.pathname)
        } else {
            alert(result.data);
        }
    }

    async function handleChangePassword(e) {
        e.preventDefault();
        const oldPassword = e.target.oldPassword.value;
        const newPassword = e.target.newPassword.value;
        const res = await fetch("/api/password", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ oldPassword: oldPassword, newPassword: newPassword }),
        });
        const result = await res.json();
        if (res.status == 200) {
            Router.reload(window.location.pathname)
        } else {
            alert(result.data);
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
        case "changeName":
            return (
                <div className={styles.pageCover}>
                    <div className={styles.container}>
                        <h1 className={styles.title}>Change username</h1>
                        <form onSubmit={handleChangeName}>
                            <input className={styles.input} name="name" type="text" placeholder="New username"></input>
                            <div className={styles.buttonContainer}>
                                <Button style="grey" onClick={() => setPopupDisplay("settings")} title="Cancel"/>
                                <Button type="submit" title="Change username"/>
                            </div>
                        </form>
                    </div>
                </div>
            );
        case "changePassword":
            return (
                <div className={styles.pageCover}>
                    <div className={styles.container}>
                        <h1 className={styles.title}>Change password</h1>
                        <form onSubmit={handleChangePassword}>
                            <input className={styles.input} name="oldPassword" type="password" placeholder="Old password"></input>
                            <input className={styles.input} name="newPassword" type="password" placeholder="New password"></input>
                            <div className={styles.buttonContainer}>
                                <Button style="grey" onClick={() => setPopupDisplay("settings")} title="Cancel"/>
                                <Button type="submit" title="Change password"/>
                            </div>
                        </form>
                    </div>
                </div>
            );
        case "settings":
            return (
                <div className={styles.pageCover}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Settings</h1>
                    <button className={styles.button} onClick={() => setPopupDisplay("changeName")}>Change username</button>
                    <button className={styles.button} onClick={() => setPopupDisplay("changePassword")}>Change password</button>
                    <Button style="negative" onClick={() => signOut()} title="Logout"/>
                    {props.children}
                </div>
            </div>
            )
        default:
            return;
    }
}