import styles from './sidemenu.module.css';
import {handleLeave} from "../services/apiCalls";

import Button from './button';
import Profile from './profile';

export default function Sidemenu(props) {

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>Details</h1>
            </div>
            <div className={styles.titleContainer}>
                <h1 className={styles.subtitle}>About</h1>
            </div>
            <div className={styles.infoContainer}>
                <Profile name={props.chatName} style="large"/>
                <h1 className={styles.infoTitle}>{props.chatName}</h1>
            </div>
            {(props.chat.type == "GROUP")?(
                <div>
                    <div className={styles.buttonContainer}>
                        {props.children}
                        <form onSubmit={(e) => {e.preventDefault(); handleLeave(props.chat.id)}}>
                            <Button type="submit" title="Leave group" style="negative"/>
                        </form>
                    </div>
                    <div className={styles.titleContainer}>
                        <h1 className={styles.subtitle}>Members - {props.chat.participants.length}</h1>
                    </div>
                    {
                        props.chat.participants.map(user =>
                            <Profile key={user.id} style="full" name={user.name}></Profile>
                        )
                    }
                </div>
            ):(
                <div className={styles.buttonContainer}>
                    <form onSubmit={(e) => {e.preventDefault(); handleLeave(props.chat.id)}}>
                        <Button type="submit" title="Delete chat" style="negative"/>
                    </form>
                </div>
            )}
        </div>
    )
}