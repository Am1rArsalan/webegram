import { Component, ParentProps } from "solid-js";
import styles from "./styles/Message.module.css";
import { classNames } from "./UI/utils/classNames";

type MessageWithAvatarProps = {
  username?: string;
  image?: string;
  disabled?: boolean;
  createdAt: string;
};

export const MessageWithAvatar: Component<
  ParentProps<MessageWithAvatarProps>
> = ({ children, username, image, createdAt, disabled = false }) => {
  return (
    <div class={classNames(styles.Message, styles.withAvatar)}>
      <img class={styles.Avatar} src={image || "https://i.pravatar.cc/300"} />
      <div class={styles.Author}>
        <div>
          <span class={styles.UserName}>{username || ""}</span>
          {/* FIXME: 3:37Pm fix this*/}
          <span class={styles.TimeStamp}>{createdAt}</span>
        </div>
        <div aria-disabled={`${disabled}`} class={styles.MessageContent}>
          {children}
        </div>
        {disabled && "DISABLED"}
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
