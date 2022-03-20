export const renderFullPage = (html: string, preloadedState: any) => {
    return `
      <!doctype html>
      <html>
        <body>
          <div id="root">${html}</div>
          <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // https://redux.js.org/usage/server-rendering#security-considerations
            window.__PRELOADED_STATE__ = ${JSON.stringify(
                preloadedState
            ).replace(/</g, '\\u003c')}
          </script>
          <script src="client.js"></script>
        </body>
      </html>
      `;
};
