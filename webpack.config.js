const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    output: {
        path: path.resolve(__dirname, "docs"),
        filename: "[name].js"
    },
    plugins: [new HtmlWebpackPlugin({
        title: "Snake",
        template: "./src/index.html",
    })],
}