import { ProfileType } from "./profile";
import { UserType } from "./user";

export type StoreType = {
  readonly token: string | null;
  readonly profile: ProfileType | null;
  readonly users: UserType[];
  readonly directs: UserType[];
  readonly socketConnection: boolean;
};
