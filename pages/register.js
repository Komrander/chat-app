import { signIn } from "next-auth/react";
import styles from '/styles/form.module.css';

import Button from '/components/app/button';
import Link from 'next/link'

export default function Form() {
  async function handleRegister(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const name = e.target.name.value;
    const password = e.target.password.value;
    const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, name: name, password: password }),
    });
    const result = await res.json();
    if (res.status == 200) {
      signIn("credentials", { email: email, password: password, callbackUrl: '/app' })
    } else {
        alert(result.data);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>Create an account</h1>
        <form className={styles.formContainer} onSubmit={handleRegister}>
          <input className={styles.input} name="email" type="email" placeholder="Email"/>
          <input className={styles.input} name="name" type="text" placeholder="Username"/>
          <input className={styles.input} name="password" type="password" placeholder="Password"/>
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