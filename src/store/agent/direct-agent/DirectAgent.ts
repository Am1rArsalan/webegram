import { DirectType } from "../../../types/direct";
import { BaseAgentImpl } from "../BaseAgent";

export interface DirectAgent {
  fetchDirects(): Promise<DirectType | undefined>;
  addToDirects(email: string): Promise<void | undefined>;
}

export class DirectAgentImpl extends BaseAgentImpl implements DirectAgent {
  constructor(token: string | null, onError: () => void) {
    super(token, onError);
  }

  addToDirects(email: string) {
    return this.createFetchHttpRequest<void>(
      "PUT",
      `/user/invite?email=${email}`,
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
