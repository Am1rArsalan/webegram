import { StoreContextType } from ".";
import { DirectAgent, DirectAgentImpl } from "./agent/direct-agent/DirectAgent";
import {
  ProfileAgent,
  ProfileAgentImpl,
} from "./agent/profile-agent/ProfileAgent";
import { UsersAgent, UsersAgentImpl } from "./agent/users-agent/UsersAgent";

export type Agent = {
  profile: ProfileAgent;
  users: UsersAgent;
  directs: DirectAgent;
};

export default function createAgent([state, actions]: StoreContextType): Agent {
  const profile: ProfileAgent = new ProfileAgentImpl(state.token, () => {
    actions.logout();
  });

  const users: UsersAgent = new UsersAgentImpl(state.token, () => {
    actions.logout();
  });

  const directs: DirectAgent = new DirectAgentImpl(state.token, () => {
    actions.logout();
  });

  return {
    profile,
    users,
    directs,
  };
}
