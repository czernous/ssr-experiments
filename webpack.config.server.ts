import nodeExternals from 'webpack-node-externals';
import path from 'path';
import TsTransformInfrno from 'ts-transform-inferno';
import TsTransformClasscat from 'ts-transform-classcat';

module.exports = {
    name: 'server',
    entry: {
        server: path.resolve(__dirname, 'src/server/server.tsx'),
    },
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.ts', '.tsx'],
    },
    externals: [nodeExternals()],
    target: 'node',
    node: {
        __dirname: false,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    configFile: 'tsconfig.server.json',
                    getCustomTransformers: () => ({
                        before: [TsTransformClasscat(), TsTransformInfrno()],
                    }),
                },
            },
        ],
    },
};
