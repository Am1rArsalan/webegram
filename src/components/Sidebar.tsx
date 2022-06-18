import { NavLink } from "solid-app-router";
import { Component, For } from "solid-js";
import styles from "./styles/Sidebar.module.css";
import UserInfo from "./UserInfo";
import UsersList from "./UsersList";

const Sidebar: Component = () => {
  return (
    <div class={styles.Nav}>
      <UserInfo />
      <nav class={styles.ChannelNav}>
        <For each={["awesome", "general"]}>
          {(title: string) => (
            <NavLink activeClass={styles.active} href={`/channel/${title}`}>
              # {title}
            </NavLink>
          )}
        </For>
        <br />
        <UsersList />
      </nav>
    </div>
  );
};

export default Sidebar;
