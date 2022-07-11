import { UserType } from "./user";

export type DirectApiType = {
  chats: any[];
  _id: string;
  from: UserType;
  to: UserType;
  created_at: string;
  updated_at: string;
};

export type DirectsApiType = DirectApiType[];

export type DirectType = {
  chats: any[];
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
    chats: direct.chats,
    created_at: direct.created_at,
    updated_at: direct.updated_at,
  };
}
