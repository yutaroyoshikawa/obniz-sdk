var path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: "./src/index.ts",
  output: {
    filename: "index.js",
    path: __dirname + "/dist"
  },
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          { loader: "babel-loader" },
          { loader: "ts-loader" },
          {
            loader: "tslint-loader",
            options: {
              typeCheck: true,
              fix: false,
              emitErrors: true
            },
          },
        ],
        exclude: /(node_modules|tests)/,
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dev'),
    compress: true,
    // port: 3000,
    open: true,
    overlay: true,
  },
};
