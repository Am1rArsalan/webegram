import { Actions } from ".";
import { DirectAgent } from "./agent/direct-agent/DirectAgent";
import { StoreType } from "../types/store";
import { createResource, createSignal } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { DirectType, newDirect } from "../types/direct";

export interface DirectActions {
  fetchDirect(to: string): void;
  createPendingChat(content: string, creationTime: string, to: string): void;
  revalidatePendingChat(
    pendingItemCreationTime: string,
    createdMessage: DirectType
  ): void;
  addMessage(message: DirectType): void;
}

export default function createDirect(
  state: StoreType,
  actions: Actions,
  agent: DirectAgent,
  setState: SetStoreFunction<StoreType>
) {
  const [directSource, setDirectsSource] = createSignal<string>("");
  const [direct, { mutate }] = createResource(directSource, async () => {
    if (!directSource()) return;
    return await agent.fetchDirect(directSource());
  });

  Object.assign<Actions, DirectActions>(actions, {
    fetchDirect(to: string) {
      setDirectsSource(to);
      setState("direct", () => {
        return direct();
      });
    },
    createPendingChat(content: string, creationTime: string, to: string) {
      if (!state.profile) return;
      const newItem = newDirect({
        creationTime,
        content,
        to,
        displayName: state.profile.displayName,
        email: state.profile.email,
        image: state.profile.image,
        userId: state.profile._id,
      });
      mutate([...state.direct, newItem]);
      setState("direct", () => {
        return direct();
      });
      const chatContainer = document.querySelector(
        "#ChatMain"
      ) as HTMLDivElement;
      chatContainer.scrollTop = chatContainer.scrollHeight;
    },
    revalidatePendingChat(
      pendingItemCreationTime: string,
      createdMessage: DirectType
    ) {
      console.log(
        "revalidatePendingChat...",
        pendingItemCreationTime,
        createdMessage
      );
      mutate(
        state.direct.map((item) => {
          if (item.created_at === pendingItemCreationTime) {
            return createdMessage;
          }
          return item;
        })
      );
      setState("direct", () => {
        return direct();
      });
    },
    addMessage(message: DirectType) {
      console.log("add message", message);
      mutate([...state.direct, message]);
      setState("direct", () => {
        return direct();
      });
    },
  });

  return direct;
}
