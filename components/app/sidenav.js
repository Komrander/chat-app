import { useSession } from "next-auth/react";
import styles from './sidenav.module.css';
import Button from './button';

export default function Sidenav() {
    const {data:session, status} = useSession();

    if (status === "loading") {
        return "Loading or not authenticated..."
    }

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>Chats</h1>
                    <Button title="Add" image="icons/plus.png" imageDark="icons/plusDark.png"/>
                </div>
            </div>
        </div>
    )
}