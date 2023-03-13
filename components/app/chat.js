import { useSession } from "next-auth/react";
import styles from './chat.module.css';

import Icon from './icon';

export default function Chat() {
    const {data:session, status} = useSession();

    if (status === "loading") {
        return "Loading or not authenticated..."
    }

    return (
        <div className={styles.container}>
            <div className={styles.messageContainer}>

            </div>
            <div className={styles.inputBar}>
                <div contentEditable="true"
                className={styles.textarea}
                role="textbox" 
                data-placeholder="Type a message to group 1..."/>
                <Icon image="icons/send.png" imageDark="icons/sendDark.png"/>
            </div>
        </div>
    )
}