import { Component } from "solid-js";
import { useStore } from "../store";
import ChannelList from "./ChannelList";
import Search from "./Search";
import styles from "./styles/Sidebar.module.css";
import { classNames } from "./UI/utils/classNames";
import UserInfo from "./UserInfo";
import DirectsList from "./DirectsList";

const Sidebar: Component = () => {
  const [store, { logout }] = useStore();

  return (
    <div class={styles.Nav}>
      <UserInfo
        displayName={store.profile?.displayName || ""}
        image={store.profile?.image || ""}
      >
        <button
          class={classNames(styles.text, styles.button)}
          onClick={() => logout()}
        >
          logout
        </button>
      </UserInfo>
      <nav class={styles.ChannelNav}>
        <ChannelList />
        <br />
        <div class={styles.List}>
          <h2> users </h2>
          <Search />
          <DirectsList />
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
