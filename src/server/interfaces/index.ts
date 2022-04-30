import http from "http";

export interface IServerData {
  trimmedPath: string;
  queryString: URLSearchParams;
  headers: http.IncomingHttpHeaders;
  method?: string;
  payload?: any;
}

export interface IHeader {
  key: string;
  value: string;
}

export interface ISsrProps {
  res: http.ServerResponse;
  req: http.IncomingMessage;
  data: IServerData;
  statusCode?: number;
}
