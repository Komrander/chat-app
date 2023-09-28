import styles from "/styles/form.module.css";
import { useState } from "react";

import { handleSignIn } from "@/services/apiCalls";

import Image from 'next/image';
import Button from "@/components/button/button";
import Link from "next/link";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
          <div className={styles.nav}>
              <Link href="/">
                <Image width="166" height="40" alt="logo" src="/logo.svg"/>
              </Link>
          </div>
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome back!</h1>
        <form className={styles.formContainer} onSubmit={(e) => {
          e.preventDefault();
          handleSignIn(email, password, "/app")
        }}>
          <input className={styles.input} name="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input className={styles.input} name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
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