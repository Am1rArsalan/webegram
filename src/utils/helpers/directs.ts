import {
	DirectApiType,
	DirectsApiType,
	DirectsType,
} from "../../types/directs";
import { UserType } from "../../types/user";
import { reshapeChats } from "./reshapeChats";

export function generateDirectsMap(
	directsApiData: DirectsApiType,
	directsMap: DirectsType,
	profileId: string
) {
	directsApiData.map((direct) => {
		const receiver = direct.from._id === profileId ? direct.to : direct.from;
		directsMap.set(receiver.email, generateDirectItem(direct, receiver));
	});
}

export function generateDirectItem(direct: DirectApiType, receiver: UserType) {
	return {
		receiver,
		_id: direct._id,
		chats: reshapeChats(direct.chats),
		created_at: direct.created_at,
		updated_at: direct.updated_at,
	};
}
