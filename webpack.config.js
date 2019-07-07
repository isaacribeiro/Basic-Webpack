const webpack = require('webpack')
const devMode = process.env.NODE_ENV !== 'production'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    mode: devMode ? 'development' : 'production',
    entry: './src/main.js',
    output: {
      filename: 'main.js',
      path: __dirname + '/public'
    },
    devServer: {
      contentBase: './public',
      port: 9000
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "style.css"
      })
    ],
    module: {
      rules:[
        {
          test:/\.s?[ac]ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            // 'style-loader', // Adds CSS to a DOM injecting a <style> tag
            'css-loader', // reads @import, url()...
            'sass-loader'
          ]
        },
        {
          test:/\.(png|svg|jpg|gif)$/,
          use: ['file-loader']
        }

      ]
    }
}
