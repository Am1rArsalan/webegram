import { MessageType } from "./message";

export type MemberType = {
  _id: string;
  displayName: string;
};

export type RoomType = {
  _id: string;
  chats: MessageType[];
  members: MemberType[];
  admin: string;
  slug: string;
  name: string;
};
