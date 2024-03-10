import styles from "./sidenav.module.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { useContext } from "react";
import { PopupContext, PopupContextType } from "@/contexts/popupContext";

import Profile from "@/components/profile/profile";
import Button from "@/components/button/button";
import Link from "next/link";

import { getDateString } from "@/utils/date";

import { FullChat } from "@/types/types";

interface SidenavProps {
  chats: FullChat[];
  chatId?: number;
}

export default function Sidenav(props: SidenavProps) {
  const { setPopupDisplay } = useContext(PopupContext) as PopupContextType;

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Link className={styles.title} href="/app">
          Chats
        </Link>
        <Button
          onClick={() => setPopupDisplay("add")}
          title="Add"
          icon={faPlus}
        />
      </div>
      {props.chats.map((chat) => (
        <Link href={`/app/chats/${encodeURIComponent(chat.id)}`} key={chat.id}>
          <div
            className={
              chat.id == props.chatId
                ? styles.navButtonHighlight
                : styles.navButton
            }
          >
            <Profile
              name={
                chat.type == "GROUP" ? chat.name : chat.participants[0].name
              }
              style="medium"
            />
            <div className={styles.navButtonContainer}>
              <div className={styles.navButtonHeader}>
                <h1 className={styles.navButtonName}>
                  {chat.type == "GROUP" ? chat.name : chat.participants[0].name}
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
      ))}
    </div>
  );
}
