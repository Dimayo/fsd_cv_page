const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        './src/index.js',
        './src/index.scss'
    ],
    output: {
        path: path.resolve(__dirname, './docs/'),
        filename: './bundle.js',
        publicPath: 'docs/'
    },
    module: {
        rules: [{
                test: /\.pug$/,
                use: ['pug-loader']
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src/js'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, 'src/scss'),
                use: ExtractTextPlugin.extract({
                    use: [{
                            loader: "css-loader",
                            options: {
                                url: false
                            }
                        },
                        {
                            loader: "postcss-loader"
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: './style.css',
            allChunks: true,
        }),
        new CopyWebpackPlugin([{
            from: './src/images',
            to: './images'
        },
        {
            from: './src/fonts',
            to: './fonts'
        },
    ]),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.pug',
            filename: 'index.html'
        }),
    ]
};