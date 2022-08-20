import { Actions } from ".";
import { StoreType } from "../types/store";
import { RoomsAgent } from "./agent/rooms-agent/RoomsAgent";
import { RoomType } from "../types/rooms";

export interface RoomActions {
  createRoom(groupName: string, slug: string): Promise<RoomType>;
}

export default function createRooms(
  state: StoreType,
  actions: Actions,
  agent: RoomsAgent
) {
  Object.assign<Actions, RoomActions>(actions, {
    createRoom(groupName: string, slug: string) {
      return agent.createRoom({ name: groupName, slug });
    },
  });
}
