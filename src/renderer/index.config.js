const path = require('path');

module.exports = {
    module: {
        rules: [{
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
    resolve: {
        extensions: ['.js'],
        modules: [
            path.join(__dirname, '../../node_modules')
        ]
    },
};