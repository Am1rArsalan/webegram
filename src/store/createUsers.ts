import { createResource, createSignal } from "solid-js";
import { Actions } from ".";
import { UsersAgent } from "./agent/users-agent/UsersAgent";
import { debounce } from "../utils";
import { UserType } from "../types/user";
import { StoreType } from "../types/store";
import { SetStoreFunction } from "solid-js/store";

export interface UsersActions {
  updateSearchQuery(query: string): void;
  fetchUsers(query?: string): Promise<UserType[] | undefined>;
  resetSearchedUsers(): void;
}

export default function createUsers(
  actions: Actions,
  agent: UsersAgent,
  setState: SetStoreFunction<StoreType>
) {
  const [query, setQuery] = createSignal("");
  const [users, { mutate }] = createResource(query, async () => {
    const searchQuery = query();
    return searchQuery.length ? await agent.fetchUsers(query()) : [];
  });

  Object.assign<Actions, UsersActions>(actions, {
    updateSearchQuery: debounce((query: string) => {
      setQuery(query);
      setState("users", () => {
        return users();
      });
    }, 300),
    fetchUsers: agent.fetchUsers,
    resetSearchedUsers: () => mutate([]),
  });

  return users;
}
