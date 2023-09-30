import styles from "./sidemenu.module.css";
import {handleLeave} from "@/services/apiCalls";

import { useContext } from "react";
import { PopupContext, PopupContextType } from "@/contexts/popupContext";

import Button from "@/components/button/button";
import Profile from "@/components/profile/profile";

import { FullChat } from "@/types/types";

interface SidemenuProps {
    chatName: string;
    chat: FullChat;
}

export default function Sidemenu(props: SidemenuProps) {
    const { setPopupDisplay } = useContext(PopupContext) as PopupContextType;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Details</h1>
            <h2 className={styles.subtitle}>About</h2>
            <div className={styles.infoContainer}>
                <Profile name={props.chatName} style="large"/>
                <h3 className={styles.infoTitle}>{props.chatName}</h3>
            </div>
            {(props.chat.type == "GROUP")?(
                <div>
                    <div className={styles.buttonContainer}>
                        <Button onClick={() => setPopupDisplay("invite")} title="Invite user"/>
                        <form onSubmit={(e) => {e.preventDefault(); handleLeave(props.chat.id)}}>
                            <Button type="submit" title="Leave group" style="negative"/>
                        </form>
                    </div>
                    <h2 className={styles.subtitle}>Members - {props.chat.participants.length}</h2>
                    {
                        props.chat.participants.map(user =>
                            <Profile key={user.id} style="full" name={user.name}></Profile>
                        )
                    }
                </div>
            ):(
                <div className={styles.buttonContainer}>
                    <form onSubmit={(e) => {e.preventDefault(); handleLeave(props.chat.id)}}>
                        <Button type="submit" title="Delete chat" style="negative"/>
                    </form>
                </div>
            )}
        </div>
    )
}