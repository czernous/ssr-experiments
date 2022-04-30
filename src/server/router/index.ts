/* eslint-disable consistent-return */
import http from "http";
import routes from "../../client/routes";
import initControllers from "../controllers";
import { IServerData } from "../interfaces";
import renderCilent from "../render";
import { isCompressedOrClient, isJsAndNotClient } from "../utils";
import logger from "../utils/logger";

class Router {
  constructor(
    protected req: http.IncomingMessage,
    protected res: http.ServerResponse,
    protected data: IServerData
  ) {
    this.req = req;
    this.res = res;
    this.data = data;
  }

  async activate() {
    const { req, res, data } = this;
    const clientRoute = routes.find((r) => r.path === req.url);
    const controllers = initControllers(req, res, data);
    const { assetsController } = controllers;
    try {
      const isLoggedIn = false;
      logger.info(`Route ${req.url} was activated`, "Router:on(activate)");

      // if (req.url === clientRoute?.path) // add some logic to handle non-client routes
      if (isCompressedOrClient(req))
        return await assetsController.getCompressedAsset();
      if (isJsAndNotClient(req))
        return await assetsController.getJavaScriptAsset();

      //
      return !clientRoute?.protected || isLoggedIn // check if authenticated when accessing admin page - change to real authentication later
        ? await renderCilent({ req, res, data })
        : res.end("<h1>You are not authorized to access this resource</h1>");
      // return (async () => {
      //   return renderCilent({ req, res, data });
      // })();
    } catch (error) {
      logger.error(error as string, "Router:on(init)");
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/html");
      res.end(`<h1>500 Internal server error: ${error}</h1>`);
    }
  }
}

const useRouter = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  data: IServerData
) => Object.freeze(new Router(req, res, data).activate());

export default useRouter;
