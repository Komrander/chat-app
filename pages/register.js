import styles from '/styles/form.module.css';

import {handleRegister} from "../services/apiCalls";

import Button from '/components/button';
import Link from 'next/link'

export default function Form() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>Create an account</h1>
        <form className={styles.formContainer} onSubmit={(e) => {e.preventDefault(); handleRegister(e.target.email.value, e.target.name.value, e.target.password.value, "/app")}}>
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