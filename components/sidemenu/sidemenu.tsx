import styles from "./sidemenu.module.css";
import {handleLeave} from "@/services/apiCalls";

import Button from "@/components/button/button";
import Profile from "@/components/profile/profile";

import { FullChat } from "@/types/types";

interface SidemenuProps {
    chatName: string;
    chat: FullChat;
    children: React.ReactNode;
}

export default function Sidemenu(props: SidemenuProps) {

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
                        {props.children}
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