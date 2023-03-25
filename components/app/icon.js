import styles from './icon.module.css';
import React from 'react';

export default function Icon(props) {
    const [isDark, setIsDark] = React.useState(false);

    return (
        <button className={styles.button}
        onClick={props.onClick}
        onMouseEnter={() => setIsDark(true)}
        onMouseLeave={() => setIsDark(false)}
        type={props.type}>
            <img className={styles.image} src={(isDark) ? (props.imageDark) : (props.image)}/>
        </button>
    )
}