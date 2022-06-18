import { createResource, createSignal } from "solid-js";
import { Actions } from ".";
import { UsersAgent } from "./agent/users-agent/UsersAgent";
import { debounce } from "../utils";

export interface UsersActions {
  updateSearchQuery(value: string): void;
}

export default function createUsers(actions: Actions, agent: UsersAgent) {
  const [value, setValue] = createSignal("");
  const [users] = createResource(value, () =>
    value().length ? agent.fetchUsers(value()) : []
  );

  const updateState = debounce((value: string) => {
    setValue(value);
  }, 1000);

  Object.assign<Actions, UsersActions>(actions, {
    updateSearchQuery: (query: string) => {
      updateState(query);
    },
  });

  return users;
}
