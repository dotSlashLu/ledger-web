const path = require('path')
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        host: '0.0.0.0',
        watch: true,
        hot: true,
        inline: true,
        contentBase: path.join(__dirname, "assets"),
        port: 8080
    }
});
