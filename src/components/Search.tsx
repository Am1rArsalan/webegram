import { useNavigate } from "solid-app-router";
import { createSignal, For } from "solid-js";
import { useStore } from "../store";

const Search = () => {
  const [value, setValue] = createSignal("");
  const [store, { updateSearchQuery, addToDirects, resetSearchedUsers }] =
    useStore();
  const nav = useNavigate();

  return (
    <ul>
      <input
        value={value()}
        onInput={(ev) => {
          setValue(ev.currentTarget.value);
          updateSearchQuery(ev.currentTarget.value);
        }}
      />
      {value()}
      <br />
      <For
        each={store.users.filter(
          (item) => !store.profile?.directs?.includes(item._id)
        )}
      >
        {(user) => {
          return (
            <li
              onClick={() => {
                addToDirects(user._id);
                setValue("");
                resetSearchedUsers();
                nav(`user/${user.email.split("@")[0]}`, {
                  state: user._id,
                });
              }}
            >
              user : {user?.email}
            </li>
          );
        }}
      </For>
    </ul>
  );
};

export default Search;
