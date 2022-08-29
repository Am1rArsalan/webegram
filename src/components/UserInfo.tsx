import { ParentProps } from "solid-js";
import styles from "./styles/UserInfo.module.css";

function UserInfo({
  displayName,
  image,
  children,
}: ParentProps<{ displayName: string; image: string }>) {
  return (
    <li class={styles.User}>
      <img
        referrerpolicy="no-referrer"
        class={styles.UserImage}
        alt="user-avatar"
        src={image}
      />
      <div class={styles.ContentContainer}>
        <div>{displayName}</div>
        <div>{children}</div>
      </div>
    </li>
  );
}

export default UserInfo;
