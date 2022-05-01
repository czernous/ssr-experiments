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

  private contentTypes = {
    js: "application/javascript",
    pdf: "application/pdf",
    css: "text/css",
    html: "text/html",
    woff: "font/woff",
    ttf: "font/ttf",
    otf: "font/otf",
    jpeg: "image/jpeg",
    jpg: "image/jpg",
    avif: "image/avif",
    gif: "image/gif",
    png: "image/png",
    svg: "image/svg+xml",
    webp: "image/webp",
  };

  private async getAsset(headers: IHeader[], file: string): Promise<void> {
    const { res, data } = this;
    if (data.method?.toUpperCase() === "GET") {
      headers.forEach((header) => {
        if (header.key.length) res.setHeader(header.key, header.value);
      });
      this.hasCacheHeader ? this.setCache(res) : null;
      res.writeHead(200);
      const rs = fs.createReadStream(path.join(staticFolder, file));
      rs.pipe(res);
    } else {
      res.writeHead(405);
      res.end();
    }
  }

  public async serveAsset(): Promise<void> {
    const foundAsset =
      findFileByPartialName(`${this.data.trimmedPath}.br`) ??
      findFileByPartialName(`${this.data.trimmedPath}`);

    const assetNameArr = foundAsset.split(".");
    const encodingHeader: IHeader = {
      key: foundAsset.includes("br") ? "Content-Encoding" : "",
      value: `${foundAsset.includes(".br") ? "br" : ""}`,
    };

    const contentTypeHeader: IHeader = {
      key: "Content-Type",
      value:
        encodingHeader.value === "br"
          ? this.contentTypes[assetNameArr[assetNameArr.length - 2]]
          : this.contentTypes[assetNameArr[assetNameArr.length - 1]],
    };

    await this.getAsset([encodingHeader, contentTypeHeader], foundAsset);
  }
}

export default AssetsController;
