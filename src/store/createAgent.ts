import { StoreContextType } from ".";
import { UserAgent, UserAgentImpl } from "./agent/user-agent/UserAgent";

export type Agent = { user: UserAgent };

export default function createAgent([state, actions]: StoreContextType): Agent {
  const user: UserAgent = new UserAgentImpl(state.token, () => {
    actions.logout();
  });

  return {
    user,
  };
}
