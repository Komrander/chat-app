import { Chat } from "@prisma/client";
import styles from "./header.module.css";

interface HeaderProps {
    chatName: string;
    chat: Chat;
    children: React.ReactNode;
}

export default function Header(props: HeaderProps) {
    return (
        <div className={styles.container}>
            <p className={styles.chatTitle}>{
            (!props.chat)?("Dashboard"):
            ((props.chat.type == "GROUP")?(props.chatName):("@"+props.chatName))}
            </p>
            {props.children}
        </div>
    )
}