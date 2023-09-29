import styles from "/styles/form.module.css";
import { useState } from "react";

import { handleRegister } from "@/services/apiCalls";

import Button from "@/components/button/button";
import Link from "next/link"
import Image from "next/image";

export default function Form() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
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
        <h1 className={styles.title}>Create an account</h1>
        <form className={styles.formContainer} onSubmit={(e) => {
          e.preventDefault();
          handleRegister(email, username, password, "/app")
        }}>
          <input className={styles.input} name="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input className={styles.input} name="name" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
          <input className={styles.input} name="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <Button type="submit" title="Register"/>
        </form>
        <div className={styles.textContainer}>
          <h1 className={styles.text}>Already have an account? </h1>
          <Link className={styles.link} href="/signin">Login</Link>
        </div>
      </div>
    </div>
  )
}