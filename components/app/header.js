import { signOut, useSession } from "next-auth/react";
import styles from './header.module.css';

import Icon from './icon';

export default function Header() {
    const {data:session, status} = useSession();

    if (status === "loading") {
        return "Loading or not authenticated..."
    }

    return (
        <div className={styles.container}>
            <p className={styles.chatTitle}>group 1</p>
            <Icon onClick={() => signOut({callbackUrl: '/..'})} image="icons/account.png" imageDark="icons/accountDark.png"/>
            <Icon image="icons/settings.png" imageDark="icons/settingsDark.png"/>
        </div>
    )
}