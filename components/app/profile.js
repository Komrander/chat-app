import styles from './profile.module.css';
import React from 'react';

export default function Profile(props) {
    switch (props.style) {
        case "large":
            return (
                <button className={styles.buttonLarge} >
                    g
                </button>
            );
        case "full":
            return (
                <div className={styles.fullContainer}>
                    <button className={styles.buttonSmall} >
                        f
                    </button>
                    <h1 className={styles.fullName}>friend 1</h1>
                </div>
            );
        case "medium":
            return (
                <button className={styles.buttonMedium} >
                    f
                </button>
            )
        default:
            return (
                <p>no style specified</p>
            )
    }
}