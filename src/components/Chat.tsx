import { Component, ParentProps } from "solid-js";
import styles from "./styles/Message.module.css";
import { classNames } from "./UI/utils/classNames";

export const MessageWithAvatar: Component<
  ParentProps<{ username?: string; image?: string }>
> = ({ children, username, image }) => {
  return (
    <div class={classNames(styles.Message, styles.withAvatar)}>
      <img class={styles.Avatar} src={image || ""} />
      <div class={styles.Author}>
        <div>
          <span class={styles.UserName}>{username || ""}</span>
          {/* FIXME: 3:37Pm fix this*/}
          <span class={styles.TimeStamp}>3:37 PM</span>
        </div>
        <div class={styles.MessageContent}> {children}</div>
      </div>
    </div>
  );
};

export const MessageWithoutAvatar: Component<ParentProps> = ({ children }) => {
  return (
    <div class={classNames(styles.Message, styles.noAvatar)}>
      <div class={styles.MessageContent}>{children}</div>
    </div>
  );
};
