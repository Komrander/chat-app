import styles from './icon.module.css';
import React from 'react';

import Image from "next/image";

export default function Icon(props) {
    const [isDark, setIsDark] = React.useState(false);

    return (
        <button className={styles.button}
        onClick={props.onClick}
        onMouseEnter={() => setIsDark(true)}
        onMouseLeave={() => setIsDark(false)}
        type={props.type}>
            <Image width="20" height="20" alt="" className={styles.image} src={(isDark) ? (props.imageDark) : (props.image)}/>
        </button>
    )
}