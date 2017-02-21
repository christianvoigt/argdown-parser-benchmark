const path = require('path');

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
          use: [{
              loader: "style-loader" // creates style nodes from JS strings
          }, {
              loader: "css-loader" // translates CSS into CommonJS
          }, {
              loader: "sass-loader" // compiles Sass to CSS
          }]
      },
      {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader?importLoaders=1',
            'postcss-loader'
          ]
      }]
    },
    node: { module: "empty", net: "empty", fs: "empty", microtime: "empty" }
    };
