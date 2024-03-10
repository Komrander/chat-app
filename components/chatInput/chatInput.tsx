import styles from "./chatInput.module.css";
import React, { useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";

import { handleSendMessage } from "@/services/apiCalls";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import Icon from "@/components/icon/icon";

interface ChatInputProps {
  chatName: string;
  chatId: number;
}

export default function ChatInput(props: ChatInputProps) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage(message, props.chatId);
        setMessage("");
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [message, props.chatId]);

  return (
    <div className={styles.container}>
      <form
        className={styles.inputBar}
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(message, props.chatId);
          setMessage("");
        }}
      >
        <TextareaAutosize
          name="message"
          className={styles.textarea}
          placeholder={"Type a message to " + props.chatName + "..."}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          autoFocus
        />
        <Icon type="submit" icon={faArrowRight} />
      </form>
    </div>
  );
}
