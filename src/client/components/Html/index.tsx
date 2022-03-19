import { InfernoNode, Props } from "inferno";


interface HtmlProps extends Props<{}> {
  children: InfernoNode,
  componentName: string
}


const Html = ({ children, componentName }: HtmlProps): JSX.Element => {
  return (
    <html>
      <head>
        <title>My Application</title>
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
      <script src="client.js" defer></script>
      <script src={`${componentName}.js`}></script>
    </html>
  );
};

export default Html;
