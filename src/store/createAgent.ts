import { StoreContextType } from ".";
import {
  DirectsAgent,
  DirectsAgentImpl,
} from "./agent/directs-agent/DirectsAgent";
import {
  ProfileAgent,
  ProfileAgentImpl,
} from "./agent/profile-agent/ProfileAgent";
import { RoomsAgent, RoomsAgentImpl } from "./agent/rooms-agent/RoomsAgent";
import { UsersAgent, UsersAgentImpl } from "./agent/users-agent/UsersAgent";

export type Agent = {
  profile: ProfileAgent;
  users: UsersAgent;
  directs: DirectsAgent;
  rooms: RoomsAgent;
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

  const rooms: RoomsAgent = new RoomsAgentImpl(state.token, () => {
    actions.logout();
  });

  return {
    profile,
    users,
    directs,
    rooms,
  };
}
