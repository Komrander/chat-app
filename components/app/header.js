import styles from './header.module.css';

export default function Header(props) {
    return (
        <div className={styles.container}>
            <p className={styles.chatTitle}>{(props.chat)?((props.chat.type == "GROUP")?(props.chatName):("@"+props.chatName)):("Dashboard")}</p>
            {props.children}
        </div>
    )
}