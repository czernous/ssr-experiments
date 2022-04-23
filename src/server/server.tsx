/* eslint-disable no-param-reassign */
import http from "http";
import fs from "fs";
import path from "path";
import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom/server";
import { StringDecoder } from "string_decoder";
import App from "../client/app";
import routes from "../client/routes";
import { createStore } from "../redux/store";
import {
  findFileByPartialName,
  isCompressedOrClient,
  isJsAndNotClient,
} from "./utils";
import AssetsController from "./controllers/assetsController";
import { UrlObject } from "url";
import { ServerData } from "./interfaces";

const PORT = process.env.PORT || 8000;

const parseJsonToObject = function (str) {
  try {
    const obj = JSON.parse(str);
    return obj;
  } catch (e) {
    return {};
  }
};

async function handler(req, res) {
  let didError = false;
  const store = createStore(); // add real reducer
  const client = findFileByPartialName("client");
  console.log(client);

  const stream = renderToPipeableStream(
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    </Provider>,
    {
      bootstrapScripts: [client],
      onShellReady() {
        res.statusCode = didError ? 500 : 200;
        res.setHeader("Content-type", "text/html");
        res.write('<div id="root">'); // add div root for react
        stream.pipe(res);
      },
      onShellError(error) {
        // Something errored before we could complete the shell so we emit an alternative shell.
        res.statusCode = 500;
        res.send(
          `<!doctype html><p>Loading...</p><script src="${findFileByPartialName(
            "client"
          )}"></script>`
        );
      },

      onError(err) {
        didError = true;
        console.error(err);
      },
    }
  );
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url!.toString(), "http://localhost:8000");

  // Get the path
  const { pathname } = parsedUrl;
  const trimmedPath = pathname.replace(/^\/+|\/+$/g, "");

  // Get the query string as an object
  const queryStringObject = parsedUrl.searchParams;

  // Get the HTTP method
  const method = req.method?.toLowerCase();

  // Get the headers as an object
  const { headers } = req;

  // Get the payload,if any
  const decoder = new StringDecoder("utf-8");
  const ssrRoute = routes.find((r) => r.path === req.url);

  req.on("data", () => {
    console.log("got some data");
    // if no data is passed we don't see this messagee
    // but we still need the handler so the "end" function works.
  });
  req.on("end", () => {
    // request part is finished... we can send a response now
    console.log("send a response");
    // we will use the standardized version of the path

    const data: ServerData = {
      trimmedPath,
      queryString: queryStringObject,
      headers,
      method,
    };

    const assetsController = new AssetsController(req, res, data);

    if (req.url === ssrRoute?.path) return handler(req, res);
    if (isCompressedOrClient(req)) return assetsController.getCompressedAsset();
    if (isJsAndNotClient(req)) return assetsController.getJavaScriptAsset();
    return (function () {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.end("<h1>404 Page not found</h1>");
    })();
  });
});

server.listen(PORT, () => {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Server running at http://localhost:${PORT}/`
  );
});
