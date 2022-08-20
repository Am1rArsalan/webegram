import { DirectsType } from "./directs";
import { ProfileType } from "./profile";
import { RoomType } from "./rooms";
import { UserType } from "./user";

export type StoreType = {
  readonly token: string | null;
  readonly profile: ProfileType | undefined;
  readonly users: UserType[];
  readonly rooms: RoomType[];
  readonly directs: DirectsType;
  readonly socketConnection: boolean;
};
