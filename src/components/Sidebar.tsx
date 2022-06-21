import { Component, createComputed, createSignal, lazy, Show } from "solid-js";
import { useStore } from "../store";
import ChannelList from "./ChannelList";
import Search from "./Search";
import styles from "./styles/Sidebar.module.css";
import { classNames } from "./UI/utils/classNames";
import UserInfo from "./UserInfo";
const DirectsList = lazy(() => import("./DirectsList"));

const Sidebar: Component = () => {
  const [{ profile }, { logout, loadDirects }] = useStore();
  const [store] = useStore();
  const [directsListLoaded, setDirectListLoaded] = createSignal(false);

  createComputed(() => {
    !store.directs.length &&
      loadDirects(store?.profile?.email ? store?.profile?.email : null);
    store.directs.length && setDirectListLoaded(true);
  });

  //TODO : fix load problem in directs list
  return (
    <div class={styles.Nav}>
      <UserInfo
        displayName={profile?.displayName || ""}
        image={profile?.image || ""}
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
          <Show when={directsListLoaded()}>
            <DirectsList />
          </Show>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
