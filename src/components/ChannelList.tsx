import { NavLink } from "solid-app-router";
import { For } from "solid-js";
import styles from "./styles/Sidebar.module.css";

function ChannelList() {
  return (
    <For each={["awesome", "general"]}>
      {(title: string) => (
        <NavLink
          class={styles.ChanelLink}
          activeClass={styles.ActiveLink}
          href={`/channel/${title}`}
        >
          # {title}
        </NavLink>
      )}
    </For>
  );
}

export default ChannelList;
