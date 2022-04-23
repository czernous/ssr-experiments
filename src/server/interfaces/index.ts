import http from "http";

export interface ServerData {
  trimmedPath: string;
  queryString: URLSearchParams;
  headers: http.IncomingHttpHeaders;
  method?: string;
  payload?: any;
}

export interface Header {
  key: string;
  value: string;
}
