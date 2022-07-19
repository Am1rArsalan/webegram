import dayjs from "dayjs";
import { MessageType } from "./message";
import { UserType } from "./user";

export type DirectApiType = {
  chats: MessageType[];
  _id: string;
  from: UserType;
  to: UserType;
  created_at: string;
  updated_at: string;
};

export type DirectsApiType = DirectApiType[];

export type DirectType = {
  chats: Map<string, MessageType[]>;
  _id: string;
  receiver: UserType;
  created_at: string;
  updated_at: string;
};

export type DirectsType = Map<string, DirectType>;

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

export function reshapeChats(chatsData: MessageType[]) {
  let chats = new Map<string, MessageType[]>();
  let originalChatsDataClone = [...chatsData];

  originalChatsDataClone.map((chatItem) => {
    if (chats.has(dayjs(chatItem.created_at).format("YYYY/MM/DD"))) {
      chats.set(dayjs(chatItem.created_at).format("YYYY/MM/DD"), [
        ...(chats.get(
          dayjs(chatItem.created_at).format("YYYY/MM/DD")
        ) as MessageType[]),
        chatItem,
      ]);
    } else {
      chats.set(dayjs(chatItem.created_at).format("YYYY/MM/DD"), [chatItem]);
    }
  });

  return chats;
}
