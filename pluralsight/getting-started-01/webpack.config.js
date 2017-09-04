const path = require('path');
const learningModule = 'building-the-game-interface';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './' + learningModule + '/index.html',
    filename: 'index.html',
    inject: 'body'
});

const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const ProvidePluginConfig = new ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery",
    Popper: ['popper.js', 'default']
});

module.exports = {
    entry: {
        'main': './' + learningModule + '/index.js'
    },
    output: {
        path: path.resolve('dist'),
        filename: 'index_bundle.js'
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            // the url-loader uses DataUrls.
            // the file-loader emits files.
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
        ]
    },
    plugins: [
        ProvidePluginConfig,
        HtmlWebpackPluginConfig,
    ]
};