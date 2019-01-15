const path = require("path");
module.exports = {
  entry: ["./src/main.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./App.bundle.js"
  },
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
        test: /\.svg/,
        use: {
            loader: 'svg-url-loader',
            options: {}
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml"
      }
    ]
  }
};
