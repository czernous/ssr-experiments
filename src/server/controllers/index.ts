import http from "http";
import { IServerData } from "../interfaces";
import AssetsController from "./assetsController";

const initControllers = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  data: IServerData
) => ({
  assetsController: new AssetsController(req, res, data),
});

export default initControllers;
