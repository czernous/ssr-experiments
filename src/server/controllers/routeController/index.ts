/* eslint-disable class-methods-use-this */
import http from "http";
import { IHeader, IServerData } from "../../interfaces";

abstract class RouteController {
  constructor(
    protected req: http.IncomingMessage,
    protected res: http.ServerResponse,
    protected data: IServerData
  ) {
    this.req = req;
    this.res = res;
    this.data = data;
  }

  static hasCacheHeader: boolean;

  setCache(header: IHeader, res: http.ServerResponse) {
    res.setHeader(header.key, header.value);
    res.setHeader("Cache-Control", "public, max-age=31536000");
  }
}

export default RouteController;
