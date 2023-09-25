import styles from './sidenav.module.css';

import Profile from './profile';
import Link from 'next/link';

export default function Sidenav(props) {
    const currentTime = new Date().getTime();

    function getTimeString(date) {
        var time = currentTime - new Date(date).getTime();

        const minutes = Math.floor(time/60000);
        const hours = Math.floor(minutes/60);
        const days = Math.floor(hours/24);
        const weeks = Math.floor(days/7);
        const months = Math.floor(days/30);
        const years = Math.floor(days/365);
        
        if (years >= 1) {
            if (years == 1) {
                return(years + " year ago")
            } else {
                return(years + " years ago");
            }
        } else if (months >= 1) {
            if (months == 1) {
                return(months + " month ago")
            } else {
                return(months + " months ago");
            }
        } else if (weeks >= 1) {
            if (weeks == 1) {
                return(weeks + " week ago")
            } else {
                return(weeks + " weeks ago");
            }
        } else if (days >= 1) {
            if (days == 1) {
                return(days + " day ago")
            } else {
                return(days + " days ago");
            }
        } else if (hours >= 1) {
            if (hours == 1) {
                return(hours + " hour ago")
            } else {
                return(hours + " hours ago");
            }
        } else {
            if (minutes < 3) {
                return("now")
            } else {
                return(minutes + " minutes ago");
            }
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <Link className={styles.title} href="/app">Chats</Link>
                {props.children}
            </div>
            {
                props.chats.map(chat =>
                    <Link href={`/app/chats/${encodeURIComponent(chat.id)}`} key={chat.id}>
                        <div className={(chat.id == props.id)?(styles.navButtonHighlight):(styles.navButton)}>
                            <Profile name={(chat.type == "GROUP")?(chat.name):(chat.participants[0].name)}
                            style="medium"/>
                            <div className={styles.navButtonContainer}>
                                <div className={styles.navButtonHeader}>
                                    <h1 className={styles.navButtonName}>
                                        {(chat.type == "GROUP")?(chat.name):(chat.participants[0].name)}
                                    </h1>
                                    <h1 className={styles.navButtonTime}>
                                        {chat.messages[0] && getTimeString(chat.messages[0].date)}
                                    </h1>
                                </div>
                                <h1 className={styles.navButtonMessage}>
                                    {chat.messages[0] && chat.messages[0].content}
                                </h1>
                            </div>
                        </div>
                    </Link>
                )
            }
        </div>
    )
}