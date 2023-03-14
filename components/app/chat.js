import { useSession } from "next-auth/react";
import styles from './chat.module.css';

import Icon from './icon';
import Profile from './profile';

export default function Chat() {
    const {data:session, status} = useSession();

    if (status === "loading") {
        return "Loading or not authenticated..."
    }

    return (
        <div className={styles.container}>
            <div className={styles.messageContainer}>
                <div className={styles.responseMessage}>
                    <Profile style="medium"/>
                    <div className={styles.responseMessageContainer}>
                        <div className={styles.responseMessageHeader}>
                            <h1 className={styles.responseMessageName}>friend 2</h1>
                            <h1 className={styles.responseMessageDate}>5.2.2023 20:25</h1>
                        </div>
                        <div className={styles.responseMessageBody}>
                            <p className={styles.responseMessageText}>Supporting line text lorem ipsum dolor sit amet, consectetur ipsum dolor sit amet, consectetur ipsum dolor sit amet, consectetur</p>
                        </div>
                    </div>
                </div>
                <div className={styles.userMessage}>
                    <div className={styles.userMessageContainer}>
                        <h1 className={styles.userMessageDate}>5.2.2023 20:25</h1>
                        <div className={styles.userMessageBody}>
                            <p className={styles.userMessageText}>Supporting line text lorem ipsum dolor sit amet, consectetur</p>
                        </div>
                    </div>
                </div>
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