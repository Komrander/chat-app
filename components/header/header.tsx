import { ChatType } from "@prisma/client";
import styles from "./header.module.css";

import { faGear } from "@fortawesome/free-solid-svg-icons";

import { useContext } from "react";
import { PopupContext, PopupContextType } from "@/contexts/popupContext";

import Icon from "@/components/icon/icon";

interface HeaderProps {
  chatName?: string;
}

export default function Header(props: HeaderProps) {
  const { setPopupDisplay } = useContext(PopupContext) as PopupContextType;

  return (
    <div className={styles.container}>
      <p className={styles.chatTitle}>
        {props.chatName ? props.chatName : "Dashboard"}
      </p>
      <Icon onClick={() => setPopupDisplay("settings")} icon={faGear} />
    </div>
  );
}
