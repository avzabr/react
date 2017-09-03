const path = require('path');
const lerningModule = 'building-the-game-interface';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './' + lerningModule + '/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    entry: './' + lerningModule + '/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'index_bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            {test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/},
            // the url-loader uses DataUrls.
            // the file-loader emits files.
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"}
        ]
    },
    plugins: [HtmlWebpackPluginConfig]
};