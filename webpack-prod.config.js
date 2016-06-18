var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname, './src'),
  entry: {
    jsx: './app.js',
    vendor: ['react']
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'js/bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.(scss|sass)$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
      },
      {
        test: /static\/images\/\.(png)$/,
        loader: "url-loader?name=/static/images/$1"
      }
    ],
    noParse: ["react"]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  externals: {
    // Use external version of
    "react": "React",
    "react-dom": "ReactDOM",
    "react-router": "ReactRouter"
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.bundle.js'),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    }),
    new ExtractTextPlugin("css/styles.css", {
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      title: 'Spectrum',
      template: "index.html",
      filename: "index.html",
      minify: {
        minifyCSS: true
      }
    })
  ]
}
