/*
 * @Author: OctopusRoe
 * @Date: 2023-07-10 09:58:20
 * @LastEditors: OctopusRoe
 * @LastEditTime: 2023-08-08 18:15:01
 * @Description:
 */
const path = require('path');
const HtmlWepackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDev = process.env.NODE_ENV === 'development';

const cssLoader = () => {
  return {
    loader: 'css-loader',
    options: {
      sourceMap: true,
      modules: {
        localIdentName: '[local]-[hash:base64:5]',
        getLocalIdent: (
          context,
          localIdentName,
          localName,
          options
        ) => {
          return localName.includes('ant')
            ? localName
            : null;
        }
      }
    }
  };
};

module.exports = {
  entry: path.join(__dirname, '../src/index.tsx'),
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    path: path.join(__dirname, '../dist'),
    clean: true,
    publicPath: '/'
  },
  cache: {
    type: 'filesystem' // 使用文件缓存
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        use: ['thread-loader', 'babel-loader'],
        include: [path.resolve(__dirname, '../src')]
      },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, '../src')],
        use: [
          isDev
            ? 'style-loader'
            : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离css
          cssLoader(),
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        include: [path.resolve(__dirname, '../src')],
        use: [
          isDev
            ? 'style-loader'
            : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离css
          cssLoader(),
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(sass|scss)$/,
        include: [path.resolve(__dirname, '../src')],
        use: [
          isDev
            ? 'style-loader'
            : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离css
          cssLoader(),
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: ''
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [path.resolve(__dirname, '../src/icon')]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset',
        exclude: [path.resolve(__dirname, '../src/icon')],
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        },
        generator: {
          filename: 'images/[name].[contenthash:8][ext]',
          publicPath: './'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        },
        generator: {
          filename: 'fonts/[name].[contenthash:8][ext]',
          publicPath: './'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        },
        generator: {
          filename: 'media/[name].[contenthash:8][ext]',
          publicPath: './'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts'],
    alias: {
      '@': path.join(__dirname, '../src')
    },
    modules: [path.resolve(__dirname, '../node_modules')]
  },
  plugins: [
    new HtmlWepackPlugin({
      title: 'React App',
      template: path.resolve(
        __dirname,
        '../public/index.html'
      ),
      inject: true
    }),
    new webpack.DefinePlugin({
      'process.env.BASE_ENV': JSON.stringify(
        process.env.BASE_ENV
      ),
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV
      )
    })
  ]
};
