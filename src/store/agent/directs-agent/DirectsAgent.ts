//TODO : fix any
import { DirectApiType, DirectsApiType } from "../../../types/directs";
import { BaseAgentImpl } from "../BaseAgent";

export interface DirectsAgent {
  fetchDirects(): Promise<DirectsApiType | undefined>;
  addToDirects(id: string): Promise<DirectApiType | undefined>;
  fetchDirectChats(id: string): Promise<any[] | undefined>;
}

export class DirectsAgentImpl extends BaseAgentImpl implements DirectsAgent {
  constructor(token: string | null, onError: () => void) {
    super(token, onError);
  }

  addToDirects(id: string) {
    return this.createFetchHttpRequest<DirectApiType>(
      "PUT",
      `/direct/invite?id=${id}`,
      "data"
    );
  }

  fetchDirects() {
    return this.createFetchHttpRequest<DirectsApiType>(
      "GET",
      "/direct/directs",
      "data"
    );
  }

  fetchDirectChats(id: string) {
    return this.createFetchHttpRequest<any[]>("GET", `/chat?id=${id}`, "data");
  }
}
