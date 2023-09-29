import styles from "./sidenav.module.css";

import Profile from "@/components/profile/profile";
import Link from "next/link";

import { getDateString } from "@/utils/date";

import { FullChat } from "@/types/types";

interface SidenavProps {
    children: React.ReactNode;
    chats: FullChat[];
    id?: number;
}

export default function Sidenav(props: SidenavProps) {
    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <Link className={styles.title} href="/app">Chats</Link>
                {props.children}
            </div>
            {props.chats.map(chat =>
                <Link href={`/app/chats/${encodeURIComponent(chat.id)}`} key={chat.id}>
                    <div className={(chat.id == props.id)?(styles.navButtonHighlight):(styles.navButton)}>
                        <Profile name={(chat.type == "GROUP")?(chat.name):(chat.participants[0].name)}
                        style="medium"/>
                        <div className={styles.navButtonContainer}>
                            <div className={styles.navButtonHeader}>
                                <h1 className={styles.navButtonName}>
                                    {(chat.type == "GROUP")?(chat.name):(chat.participants[0].name)}
                                </h1>
                                <h1 className={styles.navButtonTime}>
                                    {chat.messages[0] && getDateString(chat.messages[0].date)}
                                </h1>
                            </div>
                            <h1 className={styles.navButtonMessage}>
                                {chat.messages[0] && chat.messages[0].content}
                            </h1>
                        </div>
                    </div>
                </Link>
            )}
        </div>
    )
}