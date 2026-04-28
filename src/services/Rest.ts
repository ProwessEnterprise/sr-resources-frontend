import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ResponseWrapper {
  status: string;
  rawResponse?: AxiosResponse<any>;
  errorResponse?: any;
}

function sanitizePath(path: string): string {
  return path.replace(/[\r\n\t]/g, "");
}

function buildUrl(path: string): string | null {
  if (!API_BASE_URL) return null;
  const sanitized = sanitizePath(path);
  return `${API_BASE_URL}${sanitized}`;
}

const getHeaders = async (headers: { [key: string]: any } = {}) => {
  let token: string | null = null;
  if (typeof window !== "undefined") {
    token = sessionStorage.getItem("token");
  }
  return {
    headers: {
      ...headers,
      ...(token && { Authorization: `Bearer ${token}` }),
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    credentials: "include",
  };
};

export const getRequest = async (path: string, headers = {}): Promise<ResponseWrapper> => {
  const url = buildUrl(path);
  if (!url) return { status: "error" };
  const hdrs = await getHeaders(headers);
  try {
    const config: AxiosRequestConfig = { method: "get", headers: hdrs.headers, url };
    const rawResponse = await axios(config);
    return { status: "success", rawResponse };
  } catch (error) {
    if (process.env.NODE_ENV === "development" && axios.isAxiosError(error)) {
      console.warn("API request failed:", error.message);
    }
    return { status: "error", errorResponse: error };
  }
};

export const postRequest = async (path: string, data: any, headers = {}): Promise<ResponseWrapper> => {
  const url = buildUrl(path);
  if (!url) return { status: "error" };
  const hdrs = await getHeaders(headers);
  try {
    const rawResponse = await axios.post(url, data, hdrs);
    return { status: "success", rawResponse };
  } catch (error) {
    return { status: "error", errorResponse: error };
  }
};

