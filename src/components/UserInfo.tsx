import { useStore } from "../store";
import styles from "./styles/UserInfo.module.css";
import { classNames } from "./UI/utils/classNames";

const UserInfo = () => {
  const [{ profile }, { logout }] = useStore();
  return (
    <div class={styles.User}>
      <img class={styles.UserImage} alt="whatever" src={profile()?.image} />
      <div>
        <div>{profile()?.displayName}</div>
        <div>
          <button
            class={classNames(styles.text, styles.button)}
            onClick={() => logout()}
          >
            log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
