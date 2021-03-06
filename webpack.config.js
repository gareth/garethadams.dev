const path = require('path');
const webpack = require('webpack');

// const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SourceMapDevToolPlugin = webpack.SourceMapDevToolPlugin;
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
  entry: './assets/js/index.js',

  output: {
    filename: 'js/[name]-[contenthash].js',
    path: path.resolve(__dirname, 'src', 'assets'),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        // Apply rule for .sass, .scss or .css files
        test: /\.(sa|sc|c)ss$/,

        // Set loaders to transform files.
        // Loaders are applying from right to left(!)
        // The first loader will be applied after others
        use: [
          {
            // After all CSS loaders, we use a plugin to do its work.
            // It gets all transformed CSS and extracts it into separate
            // single bundled file
            loader: MiniCssExtractPlugin.loader
          },
          {
            // This loader resolves url() and @imports inside CSS
            loader: "css-loader",
          },
          {
            // First we transform SASS to standard CSS
            loader: "sass-loader",
            options: {
              implementation: require("sass")
            }
          }
        ]
      }
    ],
  },

  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: '../_includes/webpack.html',
      publicPath: '/assets/',
      templateContent: ({htmlWebpackPlugin}) => `${htmlWebpackPlugin.tags.headTags}`,
      inject: false,
    }),
    new SourceMapDevToolPlugin({}),
    new MiniCssExtractPlugin({
      filename: "css/[name]-[contenthash].css"
    }),
    new FaviconsWebpackPlugin({
      logo: 'assets/favicon.png',
      prefix: '',
      mode: 'webapp',
      favicons: {
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: false,
          windows: false,
          yandex: false,
        },
      },
    }),
  ],

  // Default mode for Webpack is production.
  // Depending on mode Webpack will apply different things
  // on the final bundle. For now, we don't need production's JavaScript
  // minifying and other things, so let's set mode to development
  mode: 'development',
  devtool: false
};
