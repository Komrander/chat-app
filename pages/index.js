import { signIn, signOut, useSession } from "next-auth/react";
import styles from '/styles/Home.module.css';

export default function LandingPage() {
    const {data:session, status} = useSession();

    if (status === "authenticated") {
        return (
            <>
                <p>Signed in as {session.user.email}</p>
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <button onClick={() => signIn()}>Sign in</button>
            </div>
            <div className={styles.container}>
            </div>
        </div>
    )
}