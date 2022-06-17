import { UserType } from "../../../types/user";
import { BaseAgentImpl } from "../BaseAgent";

export interface UserAgent {
  fetchUser(): Promise<UserType>;
  logout(): Promise<void>;
}

export class UserAgentImpl extends BaseAgentImpl implements UserAgent {
  constructor(token: string | null, onError: () => void) {
    super(token, onError);
  }

  fetchUser(): Promise<UserType> {
    return this.createFetchHttpRequest("GET", "/user", "data");
  }

  logout(): Promise<void> {
    return this.createFetchHttpRequest("GET", "/auth/logout", "data");
  }
}
