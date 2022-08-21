import { NavLink } from "solid-app-router";
import { For } from "solid-js";
import { useStore } from "../store";
import styles from "./styles/Sidebar.module.css";

function ChannelList() {
  const [store] = useStore();
  return (
    <For each={store.rooms}>
      {(room) => (
        <NavLink
          class={styles.ChanelLink}
          activeClass={styles.ActiveLink}
          href={`/channel/${room.slug}`}
        >
          # {room.name}
        </NavLink>
      )}
    </For>
  );
}

export default ChannelList;
