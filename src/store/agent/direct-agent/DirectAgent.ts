import { DirectType } from "../../../types/direct";
import { BaseAgentImpl } from "../BaseAgent";

export interface DirectAgent {
  fetchDirects(): Promise<DirectType | undefined>;
  addToDirects(user: string): Promise<void | undefined>;
}

export class DirectAgentImpl extends BaseAgentImpl implements DirectAgent {
  constructor(token: string | null, onError: () => void) {
    super(token, onError);
  }

  addToDirects(user: string) {
    return this.createFetchHttpRequest<void>(
      "PUT",
      `/user/invite?user=${user}`,
      "data"
    );
  }

  fetchDirects() {
    return this.createFetchHttpRequest<DirectType>(
      "GET",
      "/user/directs",
      "data"
    );
  }
}
