import { API_ROOT } from "../../constants/api";

type HttpRequestMethodType = "GET" | "POST" | "PUT" | "DELETE";

export interface BaseAgent {
  createFetchHttpRequest(
    method: HttpRequestMethodType,
    url: string,
    resKey: string
  ): Promise<any>;
  createHttpRequest<DataType>(
    method: HttpRequestMethodType,
    url: string,
    data: DataType,
    resKey: string
  ): Promise<any>;
}

export class BaseAgentImpl implements BaseAgent {
  constructor(private token: string | null, private onError: () => void) {}

  public async createFetchHttpRequest(
    method: HttpRequestMethodType,
    url: string,
    resKey: string
  ): Promise<any> {
    if (!this.token) return;

    // FIXME : make this variables type safe
    const headers: any = {};
    const opts: any = { method, headers };

    headers["Authorization"] = `${this.token}`;

    const res = await fetch(API_ROOT + url, opts);
    if (!res.ok && res.status == 401) {
      this.onError();
      return;
    }

    if (!res.ok) {
      return;
    }

    const json = await res.json();
    return resKey ? json[resKey] : json;
  }

  public async createHttpRequest<DataType>(
    method: HttpRequestMethodType,
    url: string,
    data: DataType,
    resKey: string
  ): Promise<any> {
    if (!this.token) return;

    // FIXME : make this variables type safe
    const headers: any = {};
    const opts: any = { method, headers };

    if (data !== undefined) {
      opts.body = JSON.stringify(data);
      headers["Content-Type"] = "application/json";
    }

    headers["Authorization"] = `${this.token}`;

    const res = await fetch(API_ROOT + url, opts);
    if (!res.ok && res.status == 401) {
      this.onError();
      return;
    }

    if (!res.ok) {
      return;
    }

    const json = await res.json();
    return resKey ? json[resKey] : json;
  }
}
