import { createResource, createSignal, batch } from "solid-js";
import type { Resource } from "solid-js";
import { ProfileType } from "../types/profile";
import { Actions } from ".";
import { ProfileAgent } from "./agent/profile-agent/ProfileAgent";
import { StoreType } from "../types/store";
import { SetStoreFunction } from "solid-js/store";

export interface ProfileActions {
  logout(): Promise<void>;
  loadProfile(value: string | null): void;
}

export default function createProfile(
  actions: Actions,
  agent: ProfileAgent,
  setState: SetStoreFunction<StoreType>
): Resource<ProfileType | undefined> {
  const [token, setToken] = createSignal<string | null>(null);
  const [profile, { mutate }] = createResource(token, () =>
    agent.fetchProfile()
  );

  Object.assign<Actions, ProfileActions>(actions, {
    loadProfile(value: string | null) {
      //console.log("in load profile", value, token());
      setToken(value);
    },
    logout() {
      batch(() => {
        setState({ token: undefined });
        mutate(undefined);
        window.location.replace("/auth");
        localStorage.clear();
      });
      return agent.logout();
    },
  });

  return profile;
}
