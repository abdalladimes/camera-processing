const path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ZipWebpackPlugin = require('zip-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const WebpackConfig = {

    // Disable source maps on production builds
    devtool: false,

    entry: {
        // Plugin entry points
        'control/content/content': path.join(__dirname, '../src/control/content/content.js'),
        'widget/widget': path.join(__dirname, '../src/widget/widget.js'),
    },

    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].js'
    },

    externals: {
        buildfire: 'buildfire'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: { loader: 'css-loader', options: { minimize: false } }
                })
            }
        ]
    },

    plugins: [
        // Removed UglifyJsPlugin to disable JS minification
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'control/content/index.html',
            inject: true,
            minify: false,
            template: path.join(__dirname, '../src/control/content/index.html'),
            chunks: ['devServer', 'control/content/content']
        }),
        new HtmlWebpackPlugin({
            filename: 'control/content/templates/parameter.html',
            inject: true,
            minify: false,
            template: path.join(__dirname, '../src/control/content/templates/parameter.html'),
            chunks: ['devServer']
        }),
        new HtmlWebpackPlugin({
            filename: 'control/content/templates/home.html',
            inject: true,
            minify: false,
            template: path.join(__dirname, '../src/control/content/templates/home.html'),
            chunks: ['devServer']
        }),
        new HtmlWebpackPlugin({
            filename: 'control/design/index.html',
            inject: true,
            minify: false,
            template: path.join(__dirname, '../src/control/design/index.html'),
            chunks: ['devServer', 'control/design/design']
        }),
        new HtmlWebpackPlugin({
            filename: 'widget/index.html',
            inject: true,
            minify: false,
            template: path.join(__dirname, '../src/widget/index.html'),
            chunks: ['devServer', 'widget/widget']
        }),
        new HtmlWebpackPlugin({
            filename: 'widget/templates/parameter.html',
            inject: true,
            minify: false,
            template: path.join(__dirname, '../src/widget/templates/parameter.html'),
            chunks: ['devServer']
        }),
        new HtmlWebpackPlugin({
            filename: 'widget/templates/timer.html',
            inject: true,
            minify: false,
            template: path.join(__dirname, '../src/widget/templates/timer.html'),
            chunks: ['devServer']
        }),
        new HtmlWebpackPlugin({
            filename: 'widget/templates/home.html',
            inject: true,
            minify: false,
            template: path.join(__dirname, '../src/widget/templates/home.html'),
            chunks: ['devServer']
        }),
        new HtmlWebpackPlugin({
            filename: 'widget/templates/history.html',
            inject: true,
            minify: { removeComments: true, collapseWhitespace: true },
            template: path.join(__dirname, '../src/widget/templates/history.html'),
            chunks: ['devServer']
        }),
        new HtmlWebpackPlugin({
            filename: 'widget/templates/analyze.html',
            inject: true,
            minify: { removeComments: true, collapseWhitespace: true },
            template: path.join(__dirname, '../src/widget/templates/analyze.html'),
            chunks: ['devServer']
        }),
        new HtmlWebpackPlugin({
            filename: 'widget/templates/selectTest.html',
            inject: true,
            minify: { removeComments: true, collapseWhitespace: true },
            template: path.join(__dirname, '../src/widget/templates/selectTest.html'),
            chunks: ['devServer']
        }),
        new CopyWebpackPlugin([{
            from: path.join(__dirname, '../src/control'),
            to: path.join(__dirname, '../dist/control'),
        }, {
            from: path.join(__dirname, '../src/widget'),
            to: path.join(__dirname, '../dist/widget'),
        }, {
            from: path.join(__dirname, '../src/resources'),
            to: path.join(__dirname, '../dist/resources'),
        }, {
            from: path.join(__dirname, '../plugin.json'),
            to: path.join(__dirname, '../dist/plugin.json'),
        }
        ], {
            ignore: ['*.js', '*.html', '*.md']
        }),
        new CopyWebpackPlugin([{
            from: path.join(__dirname, '../src/widget/lib'),
            to: path.join(__dirname, '../dist/widget/lib'),
        }]),
        new ExtractTextPlugin('[name].css'),
        new ZipWebpackPlugin({
            path: path.join(__dirname, '../'),
            filename: `plugin.zip`
        })
    ]

};

module.exports = WebpackConfig;
