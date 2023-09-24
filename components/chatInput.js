import styles from './chatInput.module.css';
import React, {useState, useEffect, useRef} from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import {handleSendMessage} from "../services/apiCalls";

import Icon from './icon';

export default function ChatInput(props) {
    const [message, setMessage] = useState("");

    useEffect(() => {
        const keyDownHandler = event => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                handleSendMessage(message);
                setMessage("");
            }
        };
      
        document.addEventListener('keydown', keyDownHandler);
      
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [message])

    return (
        <div className={styles.container}>
            <form className={styles.inputBar} onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(message);
                setMessage("");
            }}>
                <TextareaAutosize
                name="message"
                className={styles.textarea}
                placeholder={"Type a message to " + props.chatName + "..."}
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                autoFocus/>
                <Icon type="submit" image="/icons/send.png" imageDark="/icons/sendDark.png"/>
            </form>
        </div>
    )
}