import http from "http";
import { ServerData } from "../../interfaces";

abstract class RouteController {
  constructor(
    protected req: http.IncomingMessage,
    protected res: http.ServerResponse,
    protected data: ServerData
  ) {
    this.req = req;
    this.res = res;
    this.data = data;
  }

  static hasCacheHeader: boolean;
}

export default RouteController;
