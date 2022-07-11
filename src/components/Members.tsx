import { Component } from "solid-js";
import { classNames } from "./UI/utils/classNames";
import styles from "./styles/Members.module.css";

const Members: Component = () => {
  return (
    <div class={styles.Members}>
      <div>
        <div class={styles.Member}>
          <div class={classNames(styles.MemberStatus, styles.offline)} />
          Ryan Florence
        </div>
        <div class={styles.Member}>
          <div class={classNames(styles.MemberStatus, styles.online)} />
          cleverbot
        </div>
      </div>
    </div>
  );
};

export default Members;
