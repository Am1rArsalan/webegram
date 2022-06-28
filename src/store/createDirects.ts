import { createResource, createSignal } from "solid-js";
import type { Resource } from "solid-js";
import { DirectsType } from "../types/directs";
import { Actions } from ".";
import { DirectsAgent } from "./agent/directs-agent/DirectsAgent";
import { StoreType } from "../types/store";

export interface DirectsActions {
  addToDirects(id: string): void;
  loadDirects(value: string | null): void;
}

export default function createDirects(
  state: StoreType,
  actions: Actions,
  agent: DirectsAgent
): Resource<DirectsType | undefined> {
  const [directsSource, setDirectsSource] = createSignal();
  const [directs] = createResource(directsSource, () => agent.fetchDirects());

  Object.assign<Actions, DirectsActions>(actions, {
    loadDirects(value: string | null) {
      setDirectsSource(value);
    },

    async addToDirects(id: string) {
      if (
        state.directs?.directs.findIndex((direct) => direct._id == id) == -1
      ) {
        setDirectsSource(id);
        await agent.addToDirects(id);
      }
    },
  });

  return directs;
}
