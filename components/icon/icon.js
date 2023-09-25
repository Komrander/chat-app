import styles from './icon.module.css';
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Icon(props) {
    return (
        <button className={styles.button}
        onClick={props.onClick}
        type={props.type}>
            <FontAwesomeIcon className={styles.icon} icon={props.icon}/>
        </button>
    )
}