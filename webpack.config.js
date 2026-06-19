var webpack = require("webpack");
var BundleTracker = require("webpack-bundle-tracker");
const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./assets/js/index",
  output: {
    path: path.resolve(__dirname, "assets/webpack_bundles"),
    filename: "[name].js",
  },

  watchOptions: {
    poll: 1000, // Necesario en Windows/Docker
    ignored: /node_modules/,
  },

  plugins: [
    new BundleTracker({ filename: "webpack-stats.json", path: __dirname }),
  ],
};
