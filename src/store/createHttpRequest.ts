import { API_ROOT } from "../constants/api";

type HttpRequestMethodType = "GET" | "POST" | "PUT" | "DELETE";

export async function createFetchHttpRequest(
  method: HttpRequestMethodType,
  url: string,
  resKey: string,
  token: string | null,
  onError: () => void
) {}

export async function createHttpRequest<DataType>(
  method: HttpRequestMethodType,
  url: string,
  data: DataType,
  resKey: string,
  token: string | null,
  onError: () => void
) {}
