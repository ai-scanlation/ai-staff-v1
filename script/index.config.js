const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './script/index.js'],
    devtool: '#eval-source-map',
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            query: {
                presets: ['es2015', 'stage-2']
            }
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'stage-2']
            }
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]?[hash]'
            }
        }, {
            test: /\.sass$/,
            loader: 'sass-loader'
        }, {
            test: /\.json$/,
            use: 'json-loader'
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),

        new HtmlWebpackPlugin({
            template: 'script/index.html'
        })
    ],
    externals: {
        // 'googleapis': 'commonjs2 googleapis',
        // 'google-auth-library': 'commonjs2 google-auth-library',
        'express': 'commonjs2 express'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        modules: [
            path.join(__dirname, '../node_modules'),
            path.resolve(__dirname, 'modules')
        ]
    },
    target: 'electron-renderer'
};
