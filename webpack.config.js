var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname, './src'),
  entry: {
    jsx: './app.js',
    vendor: ['react']
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
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
        loaders: ["style", "css", "sass"]
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
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    }),
    new HtmlWebpackPlugin({
      title: 'Spectrum',
      template: "index.html",
      filename: "index.html",
      minify: false
    })
  ],
  devtool: "source-map",
  devServer: {
    contentBase: './src',
    port: 3001,
    host: "0.0.0.0",
    proxy: {
      "*": "http://localhost:3000"
    }
  }
}
