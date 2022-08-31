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
