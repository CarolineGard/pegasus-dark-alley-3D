const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    devtool: 'module-source-map',
    entry: './src/index.js',
    output: {
        path: path.resolve('build'),
        filename: 'index.bundle.js',
        publicPath: '/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
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