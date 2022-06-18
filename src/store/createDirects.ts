import { createResource } from "solid-js";
import type { Resource } from "solid-js";
import { DirectType } from "../types/direct";
import { Actions } from ".";
import { DirectAgent } from "./agent/direct-agent/DirectAgent";

export interface DirectActions {
  addToDirects(user: string): void;
}

export default function createDirects(
  actions: Actions,
  agent: DirectAgent
): Resource<DirectType | undefined> {
  const [directs, { refetch }] = createResource(() => agent.fetchDirects());

  Object.assign<Actions, DirectActions>(actions, {
    addToDirects: async (user: string) => {
      await agent.addToDirects(user);
      refetch();
    },
  });

  return directs;
}
