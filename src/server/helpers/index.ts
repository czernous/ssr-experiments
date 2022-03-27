export const renderFullPage = (html: string, preloadedState: unknown) => {
    return `
      <!doctype html>
      <html lang="en">
        <body>
          <div id="root">${html}</div>
          <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // https://redux.js.org/usage/server-rendering#security-considerations

          </script>
          <script src="client.js"></script>
        </body>
      </html>
      `;
};
