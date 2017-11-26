const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: ['babel-polyfill', './script/script.js'],
    devtool: '#eval-source-map',
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            query: {
                presets: ['es2015', 'stage-2']
            }
        }, {
            test: /\.sass$/,
            loader: 'sass-loader'
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
            test: /\.json$/,
            use: 'json-loader'
        }]
    },
    // watchOptions: {
    //     poll: true
    // },
    plugins: [
        // new webpack.DefinePlugin({
        //     "process.env": {
        //         NODE_ENV: '"development"'
        //     }
        // }),

        // new webpack.NamedModulesPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoErrorsPlugin(),
        // new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ],
    output: {
        filename: 'render.js',
        libraryTarget: 'commonjs2',
        path: path.resolve(__dirname, 'dist')
    },
    externals: {
        'googleapis': 'commonjs googleapis',
        'google-auth-library': 'commonjs google-auth-library',
        'express': 'commonjs express'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'components': path.join(__dirname, 'app/src/renderer/components')
        },
        modules: [
            path.join(__dirname, 'node_modules'),
            path.resolve(__dirname, 'script/modules')
        ]
    },
    target: 'electron-main'
};

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    module.exports.target = 'electron-renderer';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                // warnings: false
            }
        })
    ]);
}