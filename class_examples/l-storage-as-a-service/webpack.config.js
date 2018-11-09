const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },

      {
        test: /\.css$/,
        use:  [  MiniCssExtractPlugin.loader, "css-loader"]
      },

      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin( {
      filename: "style.css"
    }),
    new HtmlWebPackPlugin({
      inject: true,
      hash: true,
      template: "./src/index.html",
      filename: "./index.html"
    })

  ]
};
