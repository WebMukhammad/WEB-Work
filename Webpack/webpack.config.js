const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')


const isDev = process.env.NODE_ENV === 'development'

function optimizeCss () {
  const data = {}
  if (!isDev) {
    data.minimize = true
    data.minimizer = [
      new CssMinimizerPlugin(),
     ]
  }
  return data
}

function plugins () {
  const plugins = [
    new HTMLWebpackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: path.join(__dirname, 'src/assets/img'),
          to: path.join(__dirname, 'dist/img') 
        }
      ],
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? 'css/[name].css' : 'css/[name].[contenthash].css',
      
    }),
    new ESLintWebpackPlugin()
  ]

  if(isDev) {
    plugins.push(new BundleAnalyzerPlugin())
  }
  return plugins
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: [
    '@babel/polyfill',
    './js/index.js',
    './js/index2.js'
  ],
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isDev ? 'js/[name].bundle.js' : 'js/[name].[contenthash].bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
    hot: isDev
  },
  plugins: plugins(),
  optimization: optimizeCss(),
  module: {
    rules: [
      {
        test: /\.s?css$/i,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: path.join(__dirname, '/dist/css')
          },
        }, 
        'css-loader', 'sass-loader'
      ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: ['file-loader']
      },
      { 
        test: /\.(woff|woff2|ttf|otf)$/i,
        use: ['file-loader']
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}