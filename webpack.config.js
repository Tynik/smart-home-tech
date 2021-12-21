const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              // Prefer `dart-sass`
              implementation: require('sass')
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NETLIFY_SERVER': JSON.stringify(process.env.NETLIFY_SERVER),
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      templateParameters: {
        LOCAL_ENV: true
      },
    }),
    new CopyPlugin({
      patterns: [
        'CNAME',
        'sitemap.txt',
        {
          from: 'src/db',
          to: 'db'
        },
        {
          from: 'src/photos',
          to: 'photos'
        },
        {
          from: 'src/images',
          to: 'images'
        },
        {
          from: 'src/icons',
          to: 'icons'
        },
        {
          from: 'src/datasheets',
          to: 'datasheets'
        }
      ]
    })
  ],
  devServer: {
    hot: true,
    port: 8097,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'dist')
    },
  }
};
