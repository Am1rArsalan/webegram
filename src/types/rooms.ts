import { MessageType } from "./message";

export type RoomType = {
  _id: string;
  chats: MessageType[];
  members: string[];
  admin: string;
  slug: string;
  name: string;
};
