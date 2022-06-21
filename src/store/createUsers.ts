import { createResource, createSignal } from "solid-js";
import { Actions } from ".";
import { UsersAgent } from "./agent/users-agent/UsersAgent";
import { debounce } from "../utils";
import { UserType } from "../types/user";

export interface UsersActions {
  updateSearchQuery(query: string): void;
  fetchUsers(query?: string): Promise<UserType[] | undefined>;
  resetSearchedUsers(): void;
}

export default function createUsers(actions: Actions, agent: UsersAgent) {
  const [query, setQuery] = createSignal("");
  const [users, { mutate }] = createResource(query, () => {
    return query().length ? agent.fetchUsers(query()) : [];
  });

  Object.assign<Actions, UsersActions>(actions, {
    updateSearchQuery: debounce((query: string) => {
      setQuery(query);
    }, 300),
    fetchUsers: agent.fetchUsers,
    resetSearchedUsers: () => mutate([]),
  });

  return users;
}
