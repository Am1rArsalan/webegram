import dayjs from 'dayjs';
import { MessageType } from '../../types/message';

export function reshapeChats(chatsData: MessageType[]) {
	let chats = new Map<string, MessageType[]>();
	let originalChatsDataClone = [...chatsData];

	originalChatsDataClone.map((chatItem) => {
		if (chats.has(dayjs(chatItem.created_at).format('YYYY/MM/DD'))) {
			chats.set(dayjs(chatItem.created_at).format('YYYY/MM/DD'), [
				...(chats.get(dayjs(chatItem.created_at).format('YYYY/MM/DD')) as MessageType[]),
				chatItem,
			]);
		} else {
			chats.set(dayjs(chatItem.created_at).format('YYYY/MM/DD'), [chatItem]);
		}
	});

	return chats;
}
