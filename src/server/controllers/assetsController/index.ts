/* eslint no-use-before-define: "off", no-underscore-dangle: "off" */

import http from "http";
import path from "path";
import fs from "fs";
import { findFileByPartialName, staticFolder } from "../../utils";
import { IHeader, IServerData } from "../../interfaces";
import RouteController from "../routeController";

class AssetsController extends RouteController {
  static _instance: AssetsController;

  constructor(
    protected req: http.IncomingMessage,
    protected res: http.ServerResponse,
    protected data: IServerData
  ) {
    super(req, res, data);
    AssetsController._instance = this;
  }

  hasCacheHeader = true;

  private async getAsset(header: IHeader, file: string): Promise<void> {
    const { res, data } = this;
    if (data.method?.toUpperCase() === "GET") {
      this.hasCacheHeader ? this.setCache(header, res) : null;
      res.writeHead(200);
      const rs = fs.createReadStream(path.join(staticFolder, file));
      rs.pipe(res);
    } else {
      res.writeHead(405);
      res.end();
    }
  }

  public async getCompressedAsset(): Promise<void> {
    const foundAsset =
      findFileByPartialName(`${this.data.trimmedPath}.br`) ??
      findFileByPartialName(`${this.data.trimmedPath}`);

    const header: IHeader = {
      key: "Content-Encoding",
      value: `${foundAsset.includes(".br") ? "br" : ""}`,
    };

    this.getAsset(header, foundAsset);
  }

  public async getJavaScriptAsset(): Promise<void> {
    const header: IHeader = {
      key: "Content-Type",
      value: "application/javascript",
    };
    this.getAsset(header, this.data.trimmedPath);
  }
}

export default AssetsController;
