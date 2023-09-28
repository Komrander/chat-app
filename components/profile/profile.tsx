import styles from "./profile.module.css";
import React from "react";

interface ProfileProps {
    style: "large" | "full" | "medium" | "small";
    name: string;
}

export default function Profile(props: ProfileProps) {
    const letter = props.name.charAt(0);

    switch (props.style) {
        case "large":
            return (
                <button className={styles.buttonLarge} >
                    {letter}
                </button>
            );
        case "full":
            return (
                <div className={styles.fullContainer}>
                    <button className={styles.buttonSmall} >
                        {letter}
                    </button>
                    <h1 className={styles.fullName}>{props.name}</h1>
                </div>
            );
        case "medium":
            return (
                <button className={styles.buttonMedium} >
                    {letter}
                </button>
            )
        case "small":
            return (
                <button className={styles.buttonSmall} >
                    {letter}
                </button>
            )
        default:
            return;
    }
}