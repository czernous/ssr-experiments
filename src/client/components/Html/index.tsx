import { Props } from "inferno";

const Html = ({children}: Props<{}>): JSX.Element => {
  return (
    <html>
      <head>
        <title>My Application</title>
      </head>
      <body>
        <div id="root">{children}</div>
          </body>
          <script src="client.js" defer></script>
    </html>
  );
};

export default Html;
