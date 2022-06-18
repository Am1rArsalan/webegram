import { NavLink } from "solid-app-router";
import { Component, For, createSignal } from "solid-js";
import { useStore } from "../store";
import styles from "./styles/UsersList.module.css";

const UsersList: Component = () => {
  const [value, setValue] = createSignal("");
  const [{ users }, { updateSearchQuery }] = useStore();

  return (
    <div class={styles.UsersList}>
      <h2> users </h2>
      <input
        value={value()}
        onInput={(ev) => {
          setValue(ev.currentTarget.value);
          updateSearchQuery(ev.currentTarget.value);
        }}
      />
      <div>
        {value()}
        <br />
        {/* TODO : this should be Popover */}
        <ul>
          <For each={users()}>
            {(user) => {
              return (
                <li>
                  <NavLink href={`user/${user.email.split("@")[0]}`}>
                    user : {user.email}
                  </NavLink>
                </li>
              );
            }}
          </For>
        </ul>
      </div>
    </div>
  );
};

export default UsersList;
