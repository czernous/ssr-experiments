import path from "path"
import { CleanPlugin } from "webpack"
import {WebpackManifestPlugin} from 'webpack-manifest-plugin'

module.exports = {
  name: 'client',
  entry: {
    client: path.resolve(__dirname, 'src/client/client.tsx'),
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname + '/dist/static'),
    filename: '[name].[contenthash].js',
    publicPath: '',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        // options: {
        //   configFile: 'tsconfig.client.json',
        // },
      },
    ],
  },
  plugins: [new CleanPlugin(), new WebpackManifestPlugin({})],
}