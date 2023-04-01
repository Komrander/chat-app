import { signIn } from "next-auth/react";
import styles from "/styles/form.module.css";

import Button from "/components/app/button";
import Link from "next/link";

export default function SignIn() {
  async function handleSignIn(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    signIn("credentials", { email: email, password: password, callbackUrl: "/app" });
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome back!</h1>
        <form className={styles.formContainer} onSubmit={handleSignIn}>
          <input className={styles.input} name="email" type="email" placeholder="Email"/>
          <input className={styles.input} name="password" type="password" placeholder="Password"/>
          <Button type="submit" title="Login"/>
        </form>
        <div className={styles.textContainer}>
          <h1 className={styles.text}>Don&apos;t have an account yet? </h1>
          <Link className={styles.link} href="/register">Sign up</Link>
        </div>
      </div>
    </div>
  )
}