import { signIn, signOut, useSession } from "next-auth/react";

export default function Homepage() {
    const {data:session, status} = useSession({required: true,});

    if (status === "loading") {
        return "Loading or not authenticated..."
    }

    return (
        <>
            <p>Signed in as {session.user.email}</p>
            <button onClick={() => signOut({callbackUrl: '/..'})}>Sign out</button>
        </>
    )
}