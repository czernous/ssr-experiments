/* eslint-disable no-param-reassign */
import http from "http";
import crypto from "node:crypto";
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
  parseJsonToObject,
} from "./utils";
import AssetsController from "./controllers/assetsController";
import { ServerData } from "./interfaces";

const PORT = process.env.PORT || 8000;

const clientNonce = crypto.randomBytes(16).toString("base64");

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
      nonce: clientNonce,
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
          `<!doctype html><p>Loading...</p><script src="${client}"></script>`
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
  const { pathname } = parsedUrl;
  const trimmedPath = pathname.replace(/^\/+|\/+$/g, "");
  const queryStringObject = parsedUrl.searchParams;
  const method = req.method?.toLowerCase();
  const { headers } = req;
  const decoder = new StringDecoder("utf-8");
  const route = routes.find((r) => r.path === req.url);

  let buffer = "";

  req.on("data", async (data) => {
    console.log("got some data");
    buffer += decoder.write(data);
  });
  req.on("end", async () => {
    // request part is finished... we can send a response now
    console.log("send a response");

    const cspHeaderValues = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline' 'nonce-${clientNonce}'`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self'",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'self'",
      "form-action 'self'",
      "base-uri 'self'",
      "manifest-src 'self'",
      "worker-src 'self'",
      "child-src 'self'",
      "block-all-mixed-content",
      "upgrade-insecure-requests",
    ].join("; ");

    buffer += decoder.end();
    res.setHeader("Content-Security-Policy", cspHeaderValues);
    const data: ServerData = {
      trimmedPath,
      queryString: queryStringObject,
      headers,
      method,
      payload: parseJsonToObject(buffer),
    };

    const assetsController = new AssetsController(req, res, data);

    try {
      const isLoggedIn = false;
      // check if authenticated when accessing adming page - change to real authentication later
      if (req.url === route?.path)
        return !route?.protected || isLoggedIn
          ? await handler(req, res)
          : res.end("<h1>You are not authorized to access this resource</h1>");
      if (isCompressedOrClient(req))
        return await assetsController.getCompressedAsset();
      if (isJsAndNotClient(req))
        return await assetsController.getJavaScriptAsset();
      return (() => {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        res.end("<h1>404 Page not found</h1>");
      })();
    } catch (error) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/html");
      res.end(`<h1>500 Internal server error: ${error}</h1>`);
    }
  });
});

server.listen(PORT, () => {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Server running at http://localhost:${PORT}/`
  );
});
