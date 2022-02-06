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
    filename: '[name].js',
    publicPath: '',
  },
  resolve: {
      modules: ['src', 'node_modules'],
      extensions: ['.ts', '.tsx', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
        },
      },
    ],
  },
  plugins: [new CleanPlugin(), new WebpackManifestPlugin({})],
}