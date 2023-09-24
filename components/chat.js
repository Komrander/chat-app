import styles from './chat.module.css';
import React, {useState} from 'react';

import Profile from './profile';

export default function Chat(props) {
    const [chat, setChat] = useState(props.chat);

    React.useEffect(() => {
        setChat(props.chat);
        const interval = setInterval(async ()=>{
            try {
                const response = await fetch("/api/chat", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: props.id }),
                });

                const chatData = await response.json();
                
                if (response.status != 200) {
                    throw new Error("Server response was not OK.");
                } else {
                    setChat(chatData);
                }
            } catch (err) {
                console.log("Error while fetching data: "+err);
                clearInterval(interval);
            }
        },3000)

        return () => {
            clearInterval(interval);
        }
    }, [props.id, props.chat])

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
                {chat.messages.map(message =>
                    (message.userId == props.userId)?(
                        <div key={message.id} className={styles.userMessage}>
                            <div className={styles.userMessageContainer}>
                                <h1 className={styles.userMessageDate}>{getTimeString(message.date)}</h1>
                                <div className={styles.userMessageBody}>
                                    <pre>{message.content}</pre>
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
                                    <pre>{message.content}</pre>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}