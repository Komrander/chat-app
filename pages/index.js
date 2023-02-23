import { signIn, useSession } from "next-auth/react";

export default function Homepage() {
    const {data:session, status} = useSession();
    return (
        <>
            {status === "authenticated" &&
                <p>Signed in as {session.user.email}</p>
            }
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )
}