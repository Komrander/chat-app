import { useSession } from "next-auth/react";
import styles from './sidemenu.module.css';

import Button from './button';

export default function Sidemenu() {
    const {data:session, status} = useSession();

    if (status === "loading") {
        return "Loading or not authenticated..."
    }

    return (
        <div className={styles.container}>
        </div>
    )
}