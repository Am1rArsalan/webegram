import { Actions } from ".";
import { DirectAgent } from "./agent/direct-agent/DirectAgent";
import { StoreType } from "../types/store";
import { createResource, createSignal } from "solid-js";

export interface DirectActions {
  fetchDirect(to: string): void;
}

export default function createDirect(
  state: StoreType,
  actions: Actions,
  agent: DirectAgent
) {
  const [directSource, setDirectsSource] = createSignal<string>("");
  const [direct] = createResource(directSource, async () => {
    if (!directSource() || !state.profile) return;

    return await agent.fetchDirect(directSource());
  });

  Object.assign<Actions, DirectActions>(actions, {
    fetchDirect(to: string) {
      return setDirectsSource(to);
    },
  });

  return direct;
}
