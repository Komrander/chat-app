import styles from './button.module.css';
import React from 'react';

export default function Button(props) {
    const [isDark, setIsDark] = React.useState(false);

    return (
        <button className={styles.button}
        onMouseEnter={() => setIsDark(true)}
        onMouseLeave={() => setIsDark(false)}>
            <img className={styles.image} src={(isDark) ? (props.imageDark) : (props.image)}/>
            {props.title}
        </button>
    )
}