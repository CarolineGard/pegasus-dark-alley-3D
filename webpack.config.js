const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    devtool: 'module-source-map',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'bin')
    },
    plugins: [
        new webpack.ProvidePlugin({
            PIXI: 'pixi.js'
        })
    ],
    module: {
        rules:
            [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use:
                        [
                            {
                                loader: 'babel-loader'
                            }
                        ]
                },
                {
                    test: /\.(glsl|vs|fs|frag|vert)$/,
                    loader: 'shader-loader',
                    options: {
                        glsl: {
                            chunkPath: path.resolve("/glsl/chunks")
                        }
                    }
                }
            ]
    }
};