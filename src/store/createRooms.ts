import { createResource, createSignal } from 'solid-js';
import { StoreType } from '../types/store';
import { RoomsAgent } from './agent/rooms-agent/RoomsAgent';
import { AddMemberDto } from '../dtos/Room';
import { Actions } from '.';
import { modifyRoomsApiData, RoomClientType } from '../types/rooms';
import { reshapeChats } from '../utils/helpers/reshapeChats';
import { MessageType } from '../types/message';
import dayjs from 'dayjs';

export interface RoomActions {
	createRoom(groupName: string, slug: string): void;
	loadRooms(value: string | null): void;
	addMember(data: AddMemberDto): void;
	addRoomMessage(createdMessage: MessageType): void;
}

export default function createRooms(state: StoreType, actions: Actions, agent: RoomsAgent) {
	const [roomsSource, setRoomsSource] = createSignal();
	const [rooms, { mutate }] = createResource(roomsSource, async () => {
		const roomsData = await agent.fetchRooms();
		return modifyRoomsApiData(roomsData || []);
	});

	Object.assign<Actions, RoomActions>(actions, {
		loadRooms(value) {
			return setRoomsSource(value);
		},
		async createRoom(groupName, slug) {
			if (!state.profile) return;
			let createdRoom = await agent.createRoom({ name: groupName, slug });
			let clientRoom: RoomClientType = {
				...createdRoom,
				chats: reshapeChats(createdRoom.chats),
				members: [state.profile],
			};
			mutate((prev) => (prev ? [...prev, clientRoom] : [clientRoom]));
		},

		async addMember(data) {
			const prev = [...state.rooms];

			const foundedRoomIndex = prev.findIndex((room) => {
				return room.slug == data.roomSlug;
			});

			if (foundedRoomIndex == -1) return;

			if (prev[foundedRoomIndex].members.findIndex((item) => item._id === data.memberId) != -1) return;

			await agent.addMember(data);

			const foundedRoom = { ...prev[foundedRoomIndex] };

			// TODO : FIXME
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

		addRoomMessage(data) {
			const clone = [...state.rooms];

			const foundedRoomIndex = clone.findIndex((room) => room._id === data.room);

			if (foundedRoomIndex === -1) return clone;

			const foundedRoom = clone[foundedRoomIndex];

			const createdDate = dayjs(data.created_at).format('YYYY/MM/DD');

			if (foundedRoom.chats.has(createdDate)) {
				foundedRoom.chats.set(createdDate, [...(foundedRoom.chats.get(createdDate) || []), data]);
			} else {
				foundedRoom.chats.set(createdDate, [data]);
			}

			clone[foundedRoomIndex] = { ...foundedRoom };

			mutate(clone);
		},
	});

	return rooms;
}
