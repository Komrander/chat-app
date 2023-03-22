import styles from './button.module.css';
import React from 'react';

export default function Button(props) {
    const [isDark, setIsDark] = React.useState(false);

    return (
        <button className={(props.style == "negative") ? styles.buttonNegative : styles.button}
        onMouseEnter={() => setIsDark(true)}
        onMouseLeave={() => setIsDark(false)}
        onClick={props.onClick}
        type={props.type}>
            {(props.image && props.imageDark) &&
            <img className={styles.image} src={(isDark) ? (props.imageDark) : (props.image)}/>
            }
            {props.title}
        </button>
    )
}