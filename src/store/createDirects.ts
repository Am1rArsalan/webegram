import { createResource, createSignal } from "solid-js";
import type { Resource } from "solid-js";
import { DirectType } from "../types/direct";
import { Actions } from ".";
import { DirectAgent } from "./agent/direct-agent/DirectAgent";
import { StoreType } from "../types/store";

export interface DirectActions {
  addToDirects(email: string): void;
  loadDirects(value: string | null): void;
}

export default function createDirects(
  state: StoreType,
  actions: Actions,
  agent: DirectAgent
): Resource<DirectType | undefined> {
  const [directsSource, setDirectsSource] = createSignal();
  const [directs] = createResource(directsSource, () => agent.fetchDirects());

  Object.assign<Actions, DirectActions>(actions, {
    loadDirects(value: string | null) {
      setDirectsSource(value);
    },
    async addToDirects(email: string) {
      if (state.directs?.findIndex((direct) => direct.email == email) == -1) {
        console.log("email is ", email, directsSource());
        setDirectsSource(email);
        await agent.addToDirects(email);
      }
    },
  });

  return directs;
}
