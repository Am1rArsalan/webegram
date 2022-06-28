import { DirectType } from "./direct";
import { DirectsType } from "./directs";
import { ProfileType } from "./profile";
import { UserType } from "./user";

export type StoreType = {
  readonly token: string | null;
  readonly profile: ProfileType | undefined;
  readonly users: UserType[];
  readonly directs: DirectsType | undefined;
  readonly direct: DirectType[];
  readonly socketConnection: boolean;
};
