import { DirectsType } from "../../../types/directs";
import { BaseAgentImpl } from "../BaseAgent";

export interface DirectsAgent {
  fetchDirects(): Promise<DirectsType | undefined>;
  addToDirects(id: string): Promise<void | undefined>;
}

export class DirectsAgentImpl extends BaseAgentImpl implements DirectsAgent {
  constructor(token: string | null, onError: () => void) {
    super(token, onError);
  }

  addToDirects(id: string) {
    return this.createFetchHttpRequest<void>(
      "PUT",
      `/user/invite?email=${id}`,
      "data"
    );
  }

  fetchDirects() {
    return this.createFetchHttpRequest<DirectsType>(
      "GET",
      "/user/directs",
      "data"
    );
  }
}
