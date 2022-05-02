/* eslint-disable jsx-a11y/html-has-lang */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-param-reassign */

import { renderToPipeableStream } from "react-dom/server";
import { Provider } from "react-redux";
import React, { Suspense } from "react";
import { StaticRouter } from "react-router-dom/server";
import Helmet from "react-helmet";

import { createStore } from "../../redux/store";
import { findFileByPartialName, nonces } from "../utils";
import App from "../../client/app";
import logger from "../utils/logger";
import { ISsrProps } from "../interfaces";

const renderCilent = async ({ ...props }: ISsrProps) => {
  let didError = false;
  const store = createStore(); // add real reducer
  const client = findFileByPartialName("client");

  const assets = {
    client,
  };
  const helmet = Helmet.renderStatic();
  function HTML() {
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    return (
      <html {...htmlAttrs}>
        <head>
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
        </head>
        <body {...bodyAttrs}>
          <div id='root'>
            <Suspense fallback={<h1>Loading...</h1>}>
              <Provider store={store}>
                <StaticRouter location={props.req.url as string}>
                  <App assets={assets} data={props.data} />
                </StaticRouter>
              </Provider>
            </Suspense>
          </div>
        </body>
      </html>
    );
  }

  const stream = renderToPipeableStream(
    <HTML />,

    {
      bootstrapScripts: [assets.client],
      nonce: nonces.clientNonce,
      onShellReady() {
        props.res.statusCode = didError ? 500 : 200;
        props.res.setHeader("Content-type", "text/html");

        console.log(helmet.title.toComponent());

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

      // eslint-disable-next-line no-unused-vars
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
