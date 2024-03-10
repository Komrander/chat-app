import styles from "./chat.module.css";
import { useState, useEffect, useRef } from "react";

import Profile from "@/components/profile/profile";

import Pusher, { Channel } from "pusher-js";

import { Message } from "@/types/types";

import { getTimeString } from "@/utils/date";

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
  cluster: "eu",
});

interface ChatProps {
  messages: Message[];
  chatId: number;
  userId: number;
}

export default function Chat(props: ChatProps) {
  const [messages, setMessages] = useState(props.messages);
  let channel = useRef<Channel>();

  useEffect(() => {
    setMessages(props.messages);

    channel.current = pusher.subscribe(props.chatId.toString());

    return () => {
      pusher.unsubscribe(props.chatId.toString());
    };
  }, [props.messages, props.chatId]);

  useEffect(() => {
    if (channel.current) {
      channel.current.bind("message", (data: any) => {
        const parsedMessage = JSON.parse(data.message);

        setMessages((prev) => [parsedMessage, ...prev]);
      });
    }

    return () => {
      if (channel.current) {
        channel.current.unbind();
      }
    };
  }, [messages]);

  return (
    <div className={styles.container}>
      <div className={styles.messageContainer}>
        {messages.map((message) =>
          message.userId == props.userId ? (
            <div key={message.id} className={styles.userMessage}>
              <div className={styles.userMessageContainer}>
                <h2 className={styles.userMessageDate}>
                  {getTimeString(message.date)}
                </h2>
                <div className={styles.userMessageBody}>
                  <pre className={styles.messageText} role="paragraph">
                    {message.content}
                  </pre>
                </div>
              </div>
            </div>
          ) : (
            <div key={message.id} className={styles.responseMessage}>
              <div className={styles.profileContainer}>
                <Profile name={message.user.name} style="medium" />
              </div>
              <div className={styles.responseMessageContainer}>
                <div className={styles.responseMessageHeader}>
                  <h1 className={styles.responseMessageName}>
                    {message.user.name}
                  </h1>
                  <h2 className={styles.responseMessageDate}>
                    {getTimeString(message.date)}
                  </h2>
                </div>
                <div className={styles.responseMessageBody}>
                  <pre className={styles.messageText} role="paragraph">
                    {message.content}
                  </pre>
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
