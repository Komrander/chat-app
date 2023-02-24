import { signIn, signOut, useSession } from "next-auth/react";

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
        <button onClick={() => signIn(undefined, {callbackUrl: '/app'})}>Sign in</button>
    )
}