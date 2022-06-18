import { createResource } from "solid-js";
import type { Resource } from "solid-js";
import { ProfileType } from "../types/profile";
import { Actions } from ".";
import { ProfileAgent } from "./agent/profile-agent/ProfileAgent";

export interface ProfileActions {
  logout(): Promise<void>;
}

export default function createProfile(
  actions: Actions,
  agent: ProfileAgent
): Resource<ProfileType | undefined> {
  const [profile] = createResource(() => agent.fetchProfile());

  Object.assign<Actions, ProfileActions>(actions, {
    logout() {
      window.location.replace("/auth");
      localStorage.clear();
      return agent.logout();
    },
  });

  return profile;
}
