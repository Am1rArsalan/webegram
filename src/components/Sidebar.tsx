import { NavLink } from "solid-app-router";
import { Component, For, createSignal, createResource } from "solid-js";
import { createStore } from "solid-js/store";
import { useStore } from "../store";
import styles from "./styles/Sidebar.module.css";
import { classNames } from "./UI/utils/classNames";

const UserInfo = () => {
  const [{ user }, { logout }] = useStore();
  return (
    <div class={styles.User}>
      <img class={styles.UserImage} alt="whatever" src={user()?.image} />
      <div>
        <div>{user()?.displayName}</div>
        <div>
          <button
            class={classNames(styles.text, styles.button)}
            onClick={() => logout()}
          >
            log out
          </button>
        </div>
      </div>
    </div>
  );
};

// TODO : Make Debounced Input

const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

const Sidebar: Component = () => {
  const [value, setValue] = createSignal("");
  //const [users] = createResource(value, async () => await findUsers());

  const updateState = debounce((value: string) => {
    console.log("debounce call");
    setValue(value);
  }, 600);

  return (
    <div class={styles.Nav}>
      <UserInfo />
      <nav class={styles.ChannelNav}>
        <For each={["awesome", "general"]}>
          {(title: string) => (
            <NavLink activeClass={styles.active} href={`/channel/${title}`}>
              # user 1 {title}
            </NavLink>
          )}
        </For>
        <br />
        <div class={styles.UsersList}>
          <h2> users </h2>
          <input
            value={value()}
            onInput={(e) => {
              updateState(e.currentTarget.value);
            }}
          />
          <div> {value()}</div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
