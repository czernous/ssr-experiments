/* eslint-disable no-param-reassign */

import { renderToPipeableStream } from "react-dom/server";
import { Provider } from "react-redux";
import React, { Suspense } from "react";
import { StaticRouter } from "react-router-dom/server";

import { ChunkExtractor } from "@loadable/server";
import path from "path";
import { createStore } from "../../redux/store";
import { findFileByPartialName, nonces } from "../utils";
import App from "../../client/app";
import logger from "../utils/logger";
import { ISsrProps } from "../interfaces";

const staticFolder = path.join(__dirname, "static");
const statsFile = path.join(staticFolder, "/loadable-stats.json");
const extractor = new ChunkExtractor({ statsFile });

const renderCilent = async ({ ...props }: ISsrProps) => {
  let didError = false;
  const store = createStore(); // add real reducer
  const client = findFileByPartialName("client");

  const assets = {
    client,
  };

  const stream = renderToPipeableStream(
    <Suspense>
      <Provider store={store}>
        <StaticRouter location={props.req.url as string}>
          <App assets={assets} data={props.data} />
        </StaticRouter>
      </Provider>
    </Suspense>,

    {
      bootstrapScripts: [assets.client],
      nonce: nonces.clientNonce,
      onShellReady() {
        const code = props.statusCode ?? 200;
        props.res.statusCode = didError ? 500 : code;

        props.res.setHeader("Content-type", "text/html");
        props.res.setHeader("Cache-Control", "public, max-age=31536000");
        // add div root for react
        props.res.write(
          `<!DOCTYPE html><html lang="en"><head><title>REACT SSR APP | ${props.req.url}</title></head><div id="root">`
        );
        stream.pipe(props.res);

        const state = store.getState();

        props.res.write(
          `<script nonce=${
            nonces.reduxNonce
          }>window.__STATE__ = ${JSON.stringify(state).replace(
            /</g,
            "\\u003c"
          )}</script></html>`
        );
      },

      onShellError(error) {
        // Something errored before we could complete the shell so we emit an alternative shell.
        props.res.statusCode = 500;
        props.res.end(
          `<!doctype html><p>Loading...</p><script src="${client}"></script>`
        );
      },

      onError(err) {
        didError = true;
        logger.error(err as string, "React.ServerDOM.renderToPipeableStream");
      },
    }
  );
};

export default renderCilent;
