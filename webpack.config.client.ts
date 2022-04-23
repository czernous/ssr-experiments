/* eslint-disable import/no-extraneous-dependencies */
import path from "path";
import { CleanPlugin, HotModuleReplacementPlugin } from "webpack";
import { WebpackManifestPlugin } from "webpack-manifest-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import CompressionPlugin from "compression-webpack-plugin";
import LoadablePlugin from "@loadable/webpack-plugin";
import zlib from "zlib";

const mode = process.env.NODE_ENV || "development";

const emptyFunc = () => {};

const compressSettings: CompressionPlugin.CustomOptions = {
  filename: "[path][base].br[query]",
  algorithm: "brotliCompress",
  test: /\.(js|css|html|svg|jpeg|jpg|gif)$/,
  compressionOptions: {
    params: {
      [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
    },
  },
  threshold: 10240,
  minRatio: 0.8,
};

module.exports = () => ({
  mode,
  name: "client",
  entry: {
    client: path.resolve(__dirname, "src/client/client.tsx"),
  },
  output: {
    path: path.resolve(`${__dirname}/dist/static`),
    filename: "[name].[contenthash].js",
  },
  resolve: {
    modules: ["src", "node_modules"],
    extensions: [".ts", ".tsx", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.json$/,
        type: "asset/source",
      },
    ],
  },
  plugins: [
    new CleanPlugin(),
    new WebpackManifestPlugin({}),
    mode !== "production" ? new HotModuleReplacementPlugin() : emptyFunc,
    mode !== "production"
      ? new HtmlWebpackPlugin({ template: "./dev-server-entry/index.html" })
      : emptyFunc,
    new LoadablePlugin(),
    mode === "production" ? new CompressionPlugin(compressSettings) : emptyFunc,
  ],
  optimization: {
    mangleWasmImports: true,
    mergeDuplicateChunks: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: true,
        minify: TerserPlugin.swcMinify,
        terserOptions: {
          ecma: 5,
          compress: true,
          mangle: true,
        },
      }),
    ],

    moduleIds: "deterministic",
    nodeEnv: "production",
  },
  devServer: {
    compress: true,
    port: 3000,
    hot: true,
  },
  devtool: "inline-cheap-module-source-map",
  stats: {
    preset: "detailed",
    modules: false,
    orphanModules: false,
    entrypoints: false,
    children: true,
  },
});
