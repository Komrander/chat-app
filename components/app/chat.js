import { useSession } from "next-auth/react";
import styles from './chat.module.css';
import React from 'react';

import Icon from './icon';
import Profile from './profile';

export default function Chat(props) {
    const {data:session, status} = useSession();
    const [message, setMessage] = React.useState();

    if (status === "loading") {
        return "Loading or not authenticated..."
    }

    return (
        <div className={styles.container}>
            <div className={styles.messageContainer}>
                {
                    props.chat.messages.map(message =>
                        (message.userId == props.userId)?(
                            <div key={message.id} className={styles.userMessage}>
                                <div className={styles.userMessageContainer}>
                                    <h1 className={styles.userMessageDate}>{message.date}</h1>
                                    <div className={styles.userMessageBody}>
                                        <p className={styles.userMessageText}>{message.content}</p>
                                    </div>
                                </div>
                            </div>
                        ):(
                            <div key={message.id} className={styles.responseMessage}>
                                <Profile name={message.user.name} style="medium"/>
                                <div className={styles.responseMessageContainer}>
                                    <div className={styles.responseMessageHeader}>
                                        <h1 className={styles.responseMessageName}>{message.user.name}</h1>
                                        <h1 className={styles.responseMessageDate}>{message.date}</h1>
                                    </div>
                                    <div className={styles.responseMessageBody}>
                                        <p className={styles.responseMessageText}>{message.content}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    )
                }
            </div>
            <form className={styles.inputBar} action="/api/message" method="post">
                <textarea
                name="message"
                className={styles.textarea}
                placeholder={"Type a message to " + props.chat.name + "..."}/>
                <Icon type="submit" image="/icons/send.png" imageDark="/icons/sendDark.png"/>
            </form>
        </div>
    )
}