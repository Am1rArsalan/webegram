import { Component } from "solid-js";
import { useStore } from "../store";
import ChannelList from "./ChannelList";
import Search from "./Search";
import styles from "./styles/Sidebar.module.css";
import UserInfo from "./UserInfo";
import DirectsList from "./DirectsList";
import { Button, IconButton } from "./UI/button";
import { Plus } from "./UI/icons/Plus";

const Sidebar: Component = () => {
  const [store, { logout }] = useStore();

  return (
    <div class={styles.Nav}>
      <UserInfo
        displayName={store.profile?.displayName || ""}
        image={store.profile?.image || ""}
      >
        <div style={{ display: "flex", "justify-content": "space-evenly" }}>
          <Button class={styles.textButton} onClick={() => logout()}>
            logout
          </Button>

          <IconButton class={styles.addChannelButton}>
            <Plus fill="#000" width={11} height={11} />
          </IconButton>
        </div>
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
