import styles from "./icon.module.css";

import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface IconProps {
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    icon: IconProp;
}

export default function Icon(props: IconProps) {
    return (
        <button className={styles.button}
        onClick={props.onClick}
        type={props.type}>
            <FontAwesomeIcon className={styles.icon} icon={props.icon}/>
        </button>
    )
}