import { createResource, createSignal } from "solid-js";
import { StoreType } from "../types/store";
import { RoomsAgent } from "./agent/rooms-agent/RoomsAgent";
import { AddMemberDto } from "../dtos/Room";
import { Actions } from ".";

export interface RoomActions {
  createRoom(groupName: string, slug: string): void;
  loadRooms(value: string | null): void;
  addMember(data: AddMemberDto): void;
}

export default function createRooms(
  state: StoreType,
  actions: Actions,
  agent: RoomsAgent
) {
  const [roomsSource, setRoomsSource] = createSignal();
  const [rooms, { mutate }] = createResource(
    roomsSource,
    async () => await agent.fetchRooms()
  );

  Object.assign<Actions, RoomActions>(actions, {
    loadRooms(value: string | null) {
      return setRoomsSource(value);
    },
    async createRoom(groupName: string, slug: string) {
      if (!state.profile) return;
      let createdRoom = await agent.createRoom({ name: groupName, slug });
      createdRoom = { ...createdRoom, members: [state.profile] };
      mutate((prev) => (prev ? [...prev, createdRoom] : [createdRoom]));
    },
    async addMember(data: AddMemberDto) {
      const prev = [...state.rooms];

      const foundedRoomIndex = prev.findIndex((room) => {
        return room.slug == data.roomSlug;
      });

      if (foundedRoomIndex == -1) return;

      if (
        prev[foundedRoomIndex].members.findIndex(
          (item) => item._id === data.memberId
        ) != -1
      )
        return;

      await agent.addMember(data);
      const foundedRoom = { ...prev[foundedRoomIndex] };
      foundedRoom.members = [
        ...prev[foundedRoomIndex].members,
        {
          _id: data.memberId,
          displayName: data.memberName,
        },
      ];
      prev[foundedRoomIndex] = foundedRoom;
      mutate(prev);
    },
  });

  return rooms;
}
