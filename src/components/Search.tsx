import { createSignal, For } from "solid-js";
import { Popover } from "solid-popover";
import { useStore } from "../store";
import { UserType } from "../types/user";
import styles from "./styles/Search.module.css";

type Props = {
  action: (user: UserType) => void;
  containerRef: HTMLElement | undefined;
};

function Search(props: Props) {
  const [value, setValue] = createSignal("");
  const [store, { updateSearchQuery, resetSearchedUsers }] = useStore();

  let searchInputRef: HTMLInputElement | undefined;

  function isPopoverOpen() {
    return value().length > 0 && store.users.length > 0;
  }

  return (
    <Popover
      isOpen={isPopoverOpen()}
      positions={["bottom", "right", "left", "top"]}
      parentElement={props.containerRef}
      spacing={10}
      containerStyle={{
        background: "white",
        border: "1px solid #eee",
        padding: ".4rem 0",
        borderRadius: "4px",
      }}
      content={
        <ul class={styles.UsersList}>
          <For each={store.users}>
            {(user) => {
              return (
                <>
                  <li
                    onClick={() => {
                      props.action(user);
                      setValue("");
                      resetSearchedUsers();
                    }}
                    class={styles.UserListItem}
                  >
                    <span>
                      <img src={user.image} />
                    </span>
                    <span>{user.email}</span>
                  </li>
                  <div class={styles.Divider} />
                </>
              );
            }}
          </For>
        </ul>
      }
    >
      <input
        ref={searchInputRef}
        class={styles.SearchInput}
        value={value()}
        onInput={(ev) => {
          setValue(ev.currentTarget.value);
          updateSearchQuery(ev.currentTarget.value);
        }}
      />
    </Popover>
  );
}

export default Search;
