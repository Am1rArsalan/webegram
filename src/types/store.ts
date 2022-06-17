import { Resource } from "solid-js";
import { UserType } from "./user";

export type StoreType = {
  readonly token: string | null;
  readonly user: Resource<UserType | undefined>;
};
