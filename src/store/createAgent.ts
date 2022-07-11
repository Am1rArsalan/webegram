import { StoreContextType } from ".";
import {
  DirectsAgent,
  DirectsAgentImpl,
} from "./agent/directs-agent/DirectsAgent";
import {
  ProfileAgent,
  ProfileAgentImpl,
} from "./agent/profile-agent/ProfileAgent";
import { UsersAgent, UsersAgentImpl } from "./agent/users-agent/UsersAgent";

export type Agent = {
  profile: ProfileAgent;
  users: UsersAgent;
  directs: DirectsAgent;
};

export default function createAgent([state, actions]: StoreContextType): Agent {
  const profile: ProfileAgent = new ProfileAgentImpl(state.token, () => {
    actions.logout();
  });

  const users: UsersAgent = new UsersAgentImpl(state.token, () => {
    actions.logout();
  });

  const directs: DirectsAgent = new DirectsAgentImpl(state.token, () => {
    actions.logout();
  });

  return {
    profile,
    users,
    directs,
  };
}
