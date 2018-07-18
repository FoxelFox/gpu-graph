const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry:  "./src/main.ts",
    output: {
        filename: 'dist/bundle.js',
        path: __dirname
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.html', '.ts']
    },
    module: {
        rules: [
            { enforce: 'pre', test: /\.ts$/, use: "source-map-loader"},

            { test: /\.ts$/, loader: 'ts-loader' },
            { test: /\.glsl$/, loader: 'shader-loader' },
        ]
    },
    plugins: [
        //new UglifyJSPlugin(),
        new CopyWebpackPlugin([
            {from: 'src/main.html', to: 'dist/index.html'}
        ])
    ]
};