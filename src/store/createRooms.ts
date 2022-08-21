import { Actions } from ".";
import { StoreType } from "../types/store";
import { RoomsAgent } from "./agent/rooms-agent/RoomsAgent";
import { RoomType } from "../types/rooms";
import { createResource, createSignal } from "solid-js";

export interface RoomActions {
  createRoom(groupName: string, slug: string): Promise<RoomType>;
  loadRooms(value: string | null): void;
}

export default function createRooms(
  state: StoreType,
  actions: Actions,
  agent: RoomsAgent
) {
  const [roomsSource, setRoomsSource] = createSignal();
  const [rooms] = createResource(
    roomsSource,
    async () => await agent.fetchRooms()
  );

  Object.assign<Actions, RoomActions>(actions, {
    loadRooms(value: string | null) {
      return setRoomsSource(value);
    },
    createRoom(groupName: string, slug: string) {
      return agent.createRoom({ name: groupName, slug });
    },
  });

  return rooms;
}
