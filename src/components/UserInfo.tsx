import { Component, ParentProps } from "solid-js";
import styles from "./styles/UserInfo.module.css";

const UserInfo: Component<
  ParentProps<{ displayName: string; image: string }>
> = ({ displayName, image, children }) => {
  return (
    <li class={styles.User}>
      <img
        referrerpolicy="no-referrer"
        class={styles.UserImage}
        alt="user-avatar"
        src={image}
      />
      <div>
        <div>{displayName}</div>
        <div>{children}</div>
      </div>
    </li>
  );
};

export default UserInfo;
