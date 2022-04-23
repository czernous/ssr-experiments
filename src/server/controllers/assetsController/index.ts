/* eslint no-use-before-define: "off", no-underscore-dangle: "off" */

import http from "http";
import path from "path";
import fs from "fs";
import { findFileByPartialName, staticFolder } from "../../utils";
import { Header, ServerData } from "../../interfaces";

class AssetsController {
  static _instance: AssetsController;

  constructor(
    protected req: http.IncomingMessage,
    protected res: http.ServerResponse,
    protected data: ServerData
  ) {
    AssetsController._instance = this;
    this.req = req;
    this.res = res;
    this.data = data;
  }

  private getAsset(header: Header, file: string): void {
    const { res } = this;

    res.setHeader(header.key, header.value);
    res.setHeader("Cache-Control", "public, max-age=31536000");
    res.writeHead(200);
    const rs = fs.createReadStream(path.join(staticFolder, file));
    rs.pipe(res);
  }

  public getCompressedAsset(): void {
    const foundAsset =
      findFileByPartialName(`${this.data.trimmedPath}.br`) ??
      findFileByPartialName(`${this.data.trimmedPath}`);

    const header: Header = {
      key: "Content-Encoding",
      value: `${foundAsset.includes(".br") ? "br" : ""}`,
    };

    this.getAsset(header, foundAsset);
  }

  public getJavaScriptAsset(): void {
    const header: Header = {
      key: "Content-Type",
      value: "application/javascript",
    };
    this.getAsset(header, this.data.trimmedPath);
  }
}

export default AssetsController;
