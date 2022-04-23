import CompressionPlugin from "compression-webpack-plugin";
import fs from "fs";
import path from "path";

const mode = process.env.NODE_ENV || "development";

const emptyFunc = () => {};

const compressSettings = {
  filename: "[path][base].br[query]",
  algorithm: "brotliCompress",

  threshold: 10240,
  minRatio: 0.8,
};

const getGeneratedPages = () => {
  const pages: any[] = [];

  fs.readdirSync(path.resolve(__dirname, "dist/static")).forEach((file) => {
    if (file.match(/\.js$/) && file.includes("pages")) {
      const entry: any = {};
      entry[file.replace(".js", "")] = path.resolve(
        __dirname,
        "dist/static",
        file
      );
      pages.push(entry);
    }
  });
  return pages;
};

let entry = {};
getGeneratedPages().map((page) => {
  entry = { ...entry, ...page };
});

console.log(entry);

module.exports = () => ({
  mode,
  entry,
  resolve: {
    modules: ["dist", "node_modules"],
    extensions: [".js"],
  },
  output: {
    path: path.resolve(`${__dirname}/dist/static`),
    filename: "[name].js",
  },
  plugins: [
    mode === "production" ? new CompressionPlugin(compressSettings) : emptyFunc,
  ],
});
