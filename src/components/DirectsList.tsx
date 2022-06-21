import { NavLink } from "solid-app-router";
import { Component, For, createSignal } from "solid-js";
import { useStore } from "../store";
import styles from "./styles/UsersList.module.css";
import UserInfo from "./UserInfo";

const DirectsList: Component = () => {
  const [{ directs }] = useStore();

  return (
    <ul>
      <For each={directs}>
        {(direct) => {
          return (
            <NavLink
              activeClass={styles.ActiveDirectChat}
              class={styles.DirectChat}
              href={`/user/${direct.email.split("@")[0]}`}
            >
              <UserInfo displayName={direct.displayName} image={direct.image} />
            </NavLink>
          );
        }}
      </For>
    </ul>
  );
};

export default DirectsList;
