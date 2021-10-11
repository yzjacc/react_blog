/* webpack.config.js
 * @ Cong Min
 */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const env = process.env.NODE_ENV;
module.exports = {
    entry: {
        app: ['./src/entry.js']
    },
    output: {
        filename: env  !== 'production' ? '../dist/static/[name].js?[hash:6]':'./static/[name].js?[hash:6]',
        path: path.resolve(__dirname)
    },
    devServer: {
        contentBase: path.resolve(__dirname),
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: env  !== 'production' ? '../dist/resume.html' : './resume.html',
            inject: 'head',
            minify: {
                collapseWhitespace: true,
                minifyJS: true,
                minifyCSS: true
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(less|css)$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'postcss-loader' },
                    { loader: 'less-loader?compress' }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'static/[name].[ext]?[hash:6]'
                        }
                    },
                    { // 压缩图片：https://github.com/tcoopman/image-webpack-loader
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'static/[name].[ext]?[hash:6]'
                    }
                }
            }
        ]
    }
};
