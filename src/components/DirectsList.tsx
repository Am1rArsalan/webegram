import { NavLink } from "solid-app-router";
import { Component, For } from "solid-js";
import { useStore } from "../store";
import styles from "./styles/UsersList.module.css";
import UserInfo from "./UserInfo";

function DirectsList() {
  const [store] = useStore();

  return (
    <ul>
      <For each={Array.from(store.directs.values())}>
        {(direct) => {
          return (
            <NavLink
              activeClass={styles.ActiveDirectChat}
              class={styles.DirectChat}
              href={`/user/${direct.receiver.email.split("@")[0]}`}
            >
              <UserInfo
                displayName={direct.receiver.displayName}
                image={direct.receiver.image}
              >
                <span class={styles.UserInfoEmail}>
                  {direct.receiver.email}
                </span>
              </UserInfo>
            </NavLink>
          );
        }}
      </For>
    </ul>
  );
}

export default DirectsList;
