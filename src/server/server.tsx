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

const PORT = process.env.PORT || 8000;

const staticFolder = path.join(__dirname, "static");

const findFileByPartialName = (name: string): string => {
  const files = fs.readdirSync(staticFolder);
  const file = files.find((f) => f.includes(name));
  return file ? path.join(staticFolder, file) : "";
};

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

  const stream = renderToPipeableStream(
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    </Provider>,
    {
      bootstrapScripts: [findFileByPartialName("client")],
      onShellReady() {
        // The content above all Suspense boundaries is ready.
        // If something errored before we started streaming, we set the error code appropriately.

        res.statusCode = didError ? 500 : 200;
        res.setHeader("Content-type", "text/html");
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
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
  console.log(path);

  // Get the query string as an object
  const queryStringObject = parsedUrl.searchParams;

  // Get the HTTP method
  const method = req.method?.toLowerCase();

  // Get the headers as an object
  const { headers } = req;

  // Get the payload,if any
  const decoder = new StringDecoder("utf-8");
  const route = routes.find((r) => r.path === req.url);

  handler(req, res);
});

server.listen(PORT, () => {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Server running at http://localhost:${PORT}/`
  );
});
