import { Resource } from "solid-js";
import { ProfileType } from "./profile";
import { UserType } from "./user";

export type StoreType = {
  readonly token: string | null;
  readonly profile: Resource<ProfileType | undefined>;
  readonly users: Resource<UserType[] | undefined>;
  readonly directs: Resource<UserType[] | undefined>;
};
