import { Component } from "solid-js";
import { Button } from "../components/UI/button";
import styles from "../App.module.css";

const Auth: Component = () => {
  return (
    <div class={styles.Auth}>
      <a href="http://localhost:8080/auth/google">
        <Button class={styles.SignInButton}> Sign In</Button>
      </a>
      <div class={styles.Background} />
    </div>
  );
};

export default Auth;
