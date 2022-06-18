import { API_ROOT } from "../../constants/api";

type HttpRequestMethodType = "GET" | "POST" | "PUT" | "DELETE";

export interface BaseAgent {
  createFetchHttpRequest<T>(
    method: HttpRequestMethodType,
    url: string,
    resKey: string
  ): Promise<T | undefined>;
  createHttpRequest<DataType>(
    method: HttpRequestMethodType,
    url: string,
    data: DataType,
    resKey: string
  ): Promise<any>;
}

// TODO : add separate methods for headers and configs of api calls
export class BaseAgentImpl implements BaseAgent {
  constructor(private token: string | null, private onError: () => void) {}

  public async createFetchHttpRequest<T>(
    method: HttpRequestMethodType,
    url: string,
    resKey: string
  ): Promise<T | undefined> {
    if (!this.token) return;

    const headers: HeadersInit = {};
    const opts: RequestInit = { method, headers };

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

    const headers: HeadersInit = {};
    const opts: RequestInit = { method, headers };

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
