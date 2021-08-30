const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  context: __dirname + "/src",
  entry: "./crunker.ts",
  output: {
    path: __dirname + "/dist",
    filename: "crunker.js",
    library: "Crunker",
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-env", "@babel/preset-typescript"],
          plugins: ["@babel/proposal-class-properties", "@babel/proposal-object-rest-spread"],
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
