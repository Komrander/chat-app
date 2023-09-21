import styles from './chat.module.css';
import React from 'react';
import Router from "next/router";

import {handleSendMessage} from "../services/apiCalls";

import Icon from './icon';
import Profile from './profile';

export default function Chat(props) {
    const currentDate = new Date();
    const today = currentDate.setUTCHours(0,0,0,0);
    const yesterday = currentDate.setDate(currentDate.getDate() -1);

    function getTimeString(date) {
        date = new Date(date);

        const day = date.getDate().toString();
        const month = (date.getMonth() + 1).toString();
        const year = date.getFullYear().toString();

        const hour = date.getHours().toString();
        const minute = (date.getMinutes()<10?'0':'') + date.getMinutes().toString();
        
        if (today < date.getTime()) {
            return ("today at " + hour + ":" + minute);
        } else if (yesterday < date.getTime()) {
            return ("yesterday at " + hour + ":" + minute);
        } else {
            return (day + "." + month + "." + year + " " + hour + ":" + minute);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.messageContainer}>
                {
                    props.chat.messages.map(message =>
                        (message.userId == props.userId)?(
                            <div key={message.id} className={styles.userMessage}>
                                <div className={styles.userMessageContainer}>
                                    <h1 className={styles.userMessageDate}>{getTimeString(message.date)}</h1>
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
                                        <h1 className={styles.responseMessageDate}>{getTimeString(message.date)}</h1>
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
            <form className={styles.inputBar} onSubmit={(e) => {e.preventDefault(); handleSendMessage(e.target.message.value)}}>
                <textarea
                name="message"
                className={styles.textarea}
                placeholder={"Type a message to " + props.chatName + "..."}/>
                <Icon type="submit" image="/icons/send.png" imageDark="/icons/sendDark.png"/>
            </form>
        </div>
    )
}