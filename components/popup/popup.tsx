import React from "react";
import styles from "./popup.module.css";
import { signOut } from "next-auth/react";

import {handleAddGroup, handleAddDirect, handleInvite, handleChangeName, handleChangePassword} from "@/services/apiCalls";

import Button from "@/components/button/button";

interface PopupProps {
    display: string;
    setPopupState: (state: string) => void;
    title?: string;
    content?: string;
    chatId: number;
}

export default function Popup(props: PopupProps) {
    let title;
    let content;

    switch (props.display) {
        case "add":
            title = "Add a new chat";
            content = <>
                <div className={styles.innerContainer}>
                    <Button style="option" title="Create group" onClick={() => props.setPopupState("addGroup")}/>
                    <Button style="option" title="Start direct chat" onClick={() => props.setPopupState("addDirect")}/>
                </div>
                <Button style="grey" onClick={() => props.setPopupState("none")} title="Cancel"/>
            </>;
            break;
        case "addGroup":
            title = "Create a new group";
            content = <>
                <form onSubmit={(e) => {e.preventDefault(); handleAddGroup(e.target.name.value); props.setPopupState("none")}}>
                    <div className={styles.innerContainer}>
                        <input className={styles.input} name="name" type="text" placeholder="Group name"></input>
                    </div>
                    <div className={styles.buttonContainer}>
                        <Button style="grey" onClick={() => props.setPopupState("add")} title="Cancel"/>
                        <Button type="submit" title="Create new group"/>
                    </div>
                </form>
            </>;
            break;
        case "addDirect":
            title = "Start new direct chat";
            content = <>
                <form onSubmit={(e) => {e.preventDefault(); handleAddDirect(e.target.email.value); props.setPopupState("none")}}>
                    <div className={styles.innerContainer}>
                        <input className={styles.input} name="email" type="email" placeholder="Email"></input>
                    </div>
                    <div className={styles.buttonContainer}>
                        <Button style="grey" onClick={() => props.setPopupState("add")} title="Cancel"/>
                        <Button type="submit" title="Start direct chat"/>
                    </div>
                </form>
            </>;
            break;
        case "invite":
            title = "Send invite";
            content = <>
                <form onSubmit={(e) => {e.preventDefault(); handleInvite(e.target.email.value, props.chatId); props.setPopupState("none")}}>
                    <div className={styles.innerContainer}>
                        <input className={styles.input} name="email" type="email" placeholder="Email"></input>
                    </div>
                    <div className={styles.buttonContainer}>
                        <Button style="grey" onClick={() => props.setPopupState("none")} title="Cancel"/>
                        <Button type="submit" title="Send invite"/>
                    </div>
                </form>
            </>;
            break;
        case "changeName":
            title = "Change username";
            content = <>
                <form onSubmit={(e) => {e.preventDefault(); handleChangeName(e.target.name.value); props.setPopupState("none")}}>
                    <div className={styles.innerContainer}>
                        <input className={styles.input} name="name" type="text" placeholder="New username"></input>
                    </div>
                    <div className={styles.buttonContainer}>
                        <Button style="grey" onClick={() => props.setPopupState("settings")} title="Cancel"/>
                        <Button type="submit" title="Change username"/>
                    </div>
                </form>
            </>;
            break;
        case "changePassword":
            title = "Change password";
            content = <>
                <form onSubmit={(e) => {e.preventDefault(); handleChangePassword(e.target.oldPassword.value, e.target.newPassword.value); props.setPopupState("none")}}>
                    <div className={styles.innerContainer}>
                        <input className={styles.input} name="oldPassword" type="password" placeholder="Old password"></input>
                        <input className={styles.input} name="newPassword" type="password" placeholder="New password"></input>
                    </div>
                    <div className={styles.buttonContainer}>
                        <Button style="grey" onClick={() => props.setPopupState("settings")} title="Cancel"/>
                        <Button type="submit" title="Change password"/>
                    </div>
                </form>
            </>;
            break;
        case "settings":
            title = "Settings";
            content = <>
                <div className={styles.innerContainer}>
                    <Button style="option" title="Change username" onClick={() => props.setPopupState("changeName")}/>
                    <Button style="option" title="Change password" onClick={() => props.setPopupState("changePassword")}/>
                    <Button style="negative" onClick={() => signOut()} title="Logout"/>
                </div>
                <Button style="grey" onClick={() => props.setPopupState("none")} title="Cancel"/>
            </>;
            break;
        default:
            title = props.title ?? "Title";
            content = <>
                <div className={styles.innerContainer}>
                    <p>{props.content ?? "Content"}</p>
                </div>
                <Button style="grey" onClick={() => props.setPopupState("none")} title="Cancel"/>
            </>;
            break;
    }

    return (
        <>
            {props.display !== "none" ?
                <div className={styles.pageCover}>
                    <div className={styles.container}>
                        <h1 className={styles.title}>{title}</h1>
                        {content}
                    </div>
                </div>
            : <></>}
        </>
    )
}