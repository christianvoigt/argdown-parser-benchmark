const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: "./index.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
      noParse: [
        /benchmark.js/,
      ],
      rules: [{
          test: /\.scss$/,
          loaders: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
      }]
    },
    node: { module: "empty", net: "empty", fs: "empty", microtime: "empty" },
    plugins: [
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [
        autoprefixer(),
      ]
     }
  })
],
    };
