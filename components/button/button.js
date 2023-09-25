import styles from './button.module.css';
import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Button(props) {
    return (
        <button
        className={(props.style == "negative")?(styles.negative)
            :(props.style == "grey")?(styles.grey)
            :(props.style == "large")?(styles.large)
            :(props.style == "option")?(styles.option)
            :(styles.button)}
        onClick={props.onClick}
        type={props.type}>
            {props.icon?
                <FontAwesomeIcon className={styles.icon} icon={props.icon}/>
            :null}
            {props.title}
        </button>
    )
}