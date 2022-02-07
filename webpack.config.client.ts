import path from "path"
import { CleanPlugin, HotModuleReplacementPlugin} from "webpack"
import { WebpackManifestPlugin } from 'webpack-manifest-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import LoadablePlugin from '@loadable/webpack-plugin'

const mode = process.env.NODE_ENV || 'development';

const emptyFunc = () => { };

module.exports = () => {
  return {
    mode,
    name: 'client',
    entry: {
      client: path.resolve(__dirname, 'src/client/client.tsx'),
    },
    output: {
      path: path.resolve(__dirname + '/dist/static'),
      filename: '[name].js',
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
    plugins: [
      new CleanPlugin(),
      new WebpackManifestPlugin({}),
      mode !== 'production' ? new HotModuleReplacementPlugin() : emptyFunc,
      //mode === 'production' ? new CompressionPlugin() : emptyFunc,
      mode !== 'production' ? new HtmlWebpackPlugin({ template: './dev-server-entry/index.html' }) : emptyFunc,
      new LoadablePlugin()
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
            mangle: true
          },
        })
      ],

      moduleIds: 'deterministic',
      nodeEnv: 'production',
    },
    devServer: {
      compress: true,
      port: 3000,
      hot: true,      
    },
    devtool:'inline-cheap-module-source-map',
    stats: {
      preset: 'detailed',
      modules: false,
      orphanModules: false,
      entrypoints: false,
      children: true,
    }
 }
}