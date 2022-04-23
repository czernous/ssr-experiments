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
import { findFileByPartialName } from "./utils";
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

  const state = store.getState();
  const stream = renderToPipeableStream(
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    </Provider>,
    {
      bootstrapScripts: [client],
      onShellReady() {
        // The content above all Suspense boundaries is ready.
        // If something errored before we started streaming, we set the error code appropriately.

        res.statusCode = didError ? 500 : 200;
        res.setHeader("Content-type", "text/html");
        res.write('<div id="root">');
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
      onAllReady() {
        // If you don't want streaming, use this instead of onShellReady.
        // This will fire after the entire page content is ready.
        // You can use this for crawlers or static generation.
        // res.statusCode = didError ? 500 : 200;
        // res.setHeader('Content-type', 'text/html');
        // stream.pipe(res);
      },
      onError(err) {
        didError = true;
        console.error(err);
      },
    }
  );

  //   const store = createStore(); // add real reducer

  //   const app = ReactDOMServer.renderToString(
  //     <Provider store={store}>
  //       <StaticRouter location={req.url}>
  //         <App />
  //       </StaticRouter>
  //     </Provider>
  //   );
  //   const state = store.getState();
  //   const renderedHtml = `
  //               <!DOCTYPE html>
  //               <html lang="en">
  //                 <head>
  //                   <meta charset="UTF-8">
  //                   <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //                   <meta http-equiv="X-UA-Compatible" content="ie=edge">
  //                   <link rel="shortcut icon" type="image/png" href="/images/favicon.png">
  //                   <title>SSR example</title>
  //                 </head>
  //                 <style>
  //                   body { background: springgreen; }
  //                 </style>
  //                 <body>
  //                   <div id="root">${app}</div>
  //                   <script>
  //                               window.__STATE__ = ${JSON.stringify(state)}
  //                             </script>
  //                   <script src="${findFileByPartialName(
  //                     "client"
  //                   )}" defer></script>
  //                 </body>
  //               </html>
  //             `;
  //   res.setHeader("Content-Type", "text/html");
  //   res.writeHead(200);
  //   //   res.setHeaders("Cache-Control", "public, max-age=28800000, compress");
  //   console.log("===VANILLA NODE SERVER===");
  //   res.end(renderedHtml);
}

const ssrRoutes = routes;

const router = {
  ...ssrRoutes,
};

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
  const route = routes.find((r) => r.path === req.url);

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

    console.log(data);

    const assetsController = new AssetsController(req, res, data);

    // pass data incase we need info about the request
    // pass the response object because router is outside our scope
    if (req.url === route?.path) {
      handler(req, res);
    } else if (
      req.url?.includes(".br") ||
      req.url?.includes("client" || /\.(css|html|svg|jpeg|jpg|gif)$/)
    ) {
      assetsController.getCompressedAsset();
    } else if (req.url?.includes(".js") && !req.url?.includes("client")) {
      assetsController.getJavaScriptAsset();
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.end("<h1>404 Page not found</h1>");
    }
  });
});

server.listen(PORT, () => {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Server running at http://localhost:${PORT}/`
  );
});
