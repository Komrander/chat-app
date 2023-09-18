import styles from './button.module.css';
import React from 'react';

import Image from "next/image";

export default function Button(props) {
    const [isDark, setIsDark] = React.useState(false);

    return (
        <button
        className={(props.style == "negative")?(styles.negative)
            :(props.style == "grey")?(styles.grey)
            :(props.style == "large")?(styles.large)
            :(styles.button)}
        onMouseEnter={() => setIsDark(true)}
        onMouseLeave={() => setIsDark(false)}
        onClick={props.onClick}
        type={props.type}>
            {(props.image && props.imageDark) &&
            <Image width="12" height="12" alt="" className={styles.image} src={(isDark) ? (props.imageDark) : (props.image)}/>
            }
            {props.title}
        </button>
    )
}