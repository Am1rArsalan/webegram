import { reshapeChats } from '../utils/helpers/reshapeChats';
import { MessageType } from './message';
import { UserType } from './user';

export type RoomType = {
	_id: string;
	chats: MessageType[];
	members: UserType[];
	admin: string;
	slug: string;
	name: string;
};

export type RoomClientType = {
	_id: string;
	chats: Map<string, MessageType[]>;
	members: UserType[];
	admin: string;
	slug: string;
	name: string;
};

export function modifyRoomsApiData(rooms: RoomType[]) {
	return rooms.map((room) => {
		const clientRoom: RoomClientType = {
			...room,
			chats: reshapeChats(room.chats),
		};

		return clientRoom;
	});
}
