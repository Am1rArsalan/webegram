import { createResource, createSignal } from "solid-js";
import type { Resource } from "solid-js";
import {
  DirectApiType,
  DirectsApiType,
  DirectsType,
  generateDirectItem,
  generateDirectsMap,
} from "../types/directs";
import { Actions } from ".";
import { DirectsAgent } from "./agent/directs-agent/DirectsAgent";
import { StoreType } from "../types/store";
import { scrollToEndOfList } from "../components/ChatInputForm";

// TODO : fix any

export interface DirectsActions {
  addToDirects(userEmail: string, userId: string): void;
  loadDirects(value: string | null): void;
  addMessage(createdMessage: any): void;
  receiveDirect(addedDirect: DirectApiType): void;
}

export default function createDirects(
  state: StoreType,
  actions: Actions,
  agent: DirectsAgent
): Resource<DirectsType | undefined> {
  const [directsSource, setDirectsSource] = createSignal();
  const [directs, { mutate }] = createResource(directsSource, async () => {
    const directsData = await agent.fetchDirects();
    const directsMap: DirectsType = new Map();
    if (directsData && state.profile) {
      generateDirectsMap(directsData, directsMap, state.profile._id);
    }
    return directsMap;
  });

  Object.assign<Actions, DirectsActions>(actions, {
    loadDirects(value: string | null) {
      setDirectsSource(value);
    },
    addMessage(createdMessage: any) {
      const directsMapClone = new Map(directs());
      directsMapClone?.forEach((direct) => {
        if (direct._id === createdMessage.room) {
          direct.chats = [...direct.chats, createdMessage];
        }
      });
      mutate(directsMapClone);
      scrollToEndOfList();
    },
    async addToDirects(userEmail: string, userId: string) {
      const directsMap = new Map(directs());
      if (directsMap && !directsMap.has(userEmail)) {
        const addedDirect = await agent.addToDirects(userId);
        if (addedDirect) {
          actions.emitNewDirect({ userId, createdDirect: addedDirect });
          const receiver =
            state.profile && addedDirect.from._id === state.profile._id
              ? addedDirect.to
              : addedDirect.from;
          directsMap.set(
            receiver.email,
            generateDirectItem(addedDirect, receiver)
          );
          mutate(directsMap);
        }
      }
    },

    async receiveDirect(addedDirect) {
      const directsMap = new Map(directs());
      const receiver =
        state.profile && addedDirect.from._id === state.profile._id
          ? addedDirect.to
          : addedDirect.from;
      directsMap.set(receiver.email, generateDirectItem(addedDirect, receiver));
      mutate(directsMap);
    },
  });

  return directs;
}
