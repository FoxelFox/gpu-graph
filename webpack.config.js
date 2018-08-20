const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/main.ts"
  },
  output: {
    filename: "[name].bundle.js",
    path: __dirname + "/public"
  },
  devtool: "source-map",
  resolve: {
    extensions: [".html", ".ts"]
  },
  module: {
    rules: [
      { enforce: "pre", test: /\.js$/, use: "source-map-loader" },
      { test: /\.ts$/, loader: "awesome-typescript-loader" },
      { test: /\.glsl$/, loader: "shader-loader" },
      { test: /\.css$/, loader: [MiniCssExtractPlugin.loader, "css-loader"] }
    ]
  },
  mode: "production",
  plugins: [
    new MiniCssExtractPlugin({
      chunkFilename: "[id].css",
      filename: "[name].css"
    }),
    new HTMLWebpackPlugin({
      template: "src/main.html",
      xhtml: true
    })
  ]
};
