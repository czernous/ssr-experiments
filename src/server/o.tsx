import fs from "fs";
import fastify from "fastify";
import fastifyStatic from "fastify-static";
import fastifyHelmet from "fastify-helmet";
import fastifyCompress from "fastify-compress";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { ChunkExtractor } from "@loadable/server";
import { Provider } from "react-redux";
import App from "../client/app";
import routes from "../client/routes";
import { createStore } from "../redux/store";

const staticFolder = path.join(__dirname, "static");
const statsFile = path.join(staticFolder, "/loadable-stats.json");
const extractor = new ChunkExtractor({ statsFile });

/**
 * @description Finds a file by partial name and returns the full filename(with a hash)
 * @param name
 * @returns {string}
 */
// eslint-disable-next-line import/prefer-default-export
export const findFileByPartialName = (name: string): string => {
  const files = fs.readdirSync(staticFolder);
  const file = files.find((f) => f.includes(name));
  return file;
};

const server = fastify({
  logger: true,
});

server.register(fastifyCompress, {
  global: true,
});

server.register(fastifyHelmet, {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: [`'self'`],
      scriptSrc: [`'self'`, `'unsafe-inline'`],
      styleSrc: [`'self'`, `'unsafe-inline'`],
    },
  },
  crossOriginResourcePolicy: true,
  xssFilter: true,
});

server.register(fastifyStatic, {
  root: staticFolder,
  cacheControl: true,
  maxAge: 31536000,
});

routes.forEach((route) =>
  server.route({
    method: "GET",
    url: route.path,
    schema: {
      response: {
        200: {
          type: "string",
        },
      },
    },
    handler: async (request, reply) => {
      const store = createStore(); // add real reducer

      const app = ReactDOMServer.renderToString(
        extractor.collectChunks(
          <Provider store={store}>
            <StaticRouter location={request.url}>
              <App />
            </StaticRouter>
          </Provider>
        )
      );
      const state = store.getState();
      const renderedHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="shortcut icon" type="image/png" href="/images/favicon.png">
        <title>SSR example</title>
      </head>
      <style>
        body { background: springgreen; }
      </style>
      <body>
        <div id="root">${app}</div>
        <script>
                    window.__STATE__ = ${JSON.stringify(state)}
                  </script>
        <script src="${findFileByPartialName("client")}" defer></script>
      </body>
    </html>
  `;
      reply.type("text/html");
      reply.header("Cache-Control", "public, max-age=28800000, compress");
      return reply.send(renderedHtml);
    },
  })
);

server.listen(8000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
