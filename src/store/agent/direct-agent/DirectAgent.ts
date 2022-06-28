import { DirectType } from "../../../types/direct";
import { BaseAgentImpl } from "../BaseAgent";

export interface DirectAgent {
  fetchDirect(from?: string, to?: string): Promise<DirectType[] | undefined>;
}

export class DirectAgentImpl extends BaseAgentImpl implements DirectAgent {
  constructor(token: string | null, onError: () => void) {
    super(token, onError);
  }

  fetchDirect(to?: string) {
    return this.createFetchHttpRequest<DirectType[]>(
      "GET",
      `/chat/direct/${to}`,
      "data"
    );
  }
}
