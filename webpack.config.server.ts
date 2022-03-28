/* eslint-disable import/no-extraneous-dependencies */
import nodeExternals from "webpack-node-externals";
import path from "path";

module.exports = {
  name: "server",
  entry: {
    server: path.resolve(__dirname, "src/server/server.tsx"),
  },
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", ".tsx"],
  },
  externals: [nodeExternals()],
  target: "node",
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              presets: [
                ["@babel/preset-env", { targets: { node: "current" } }],
              ],
              plugins: ["@loadable/babel-plugin"],
            },
          },

          // {
          //   loader: 'ts-loader',
          //   options: {
          //     configFile: 'tsconfig.server.json',
          //   },
          // },
        ],
      },
      {
        test: /\.json$/,
        type: "asset/source",
      },
    ],
  },
};
