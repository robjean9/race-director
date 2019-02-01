const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require("path");

module.exports = {
  mode: 'production',

  // Each entry has an array assigned so that webpack-hot-middleware can be merged into it in dev.
  // See: https://github.com/webpack-contrib/webpack-hot-middleware#use-with-multiple-entry-points-in-webpack
  // Also e.g.: https://github.com/webpack-contrib/webpack-hot-middleware/issues/197
  entry: {
    app: ['./src/index.tsx'],
  },
  node: {
    __dirname: false,
    __filename: false,
    fs: "empty"
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    // Copy necessary files that won't be in the .js bundle
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'src/index.html'),
      to: path.resolve(__dirname, 'dist/index.html'),
    }]),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"]
  },
  module: {
    rules: [{
        // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.(jpg|png|svg|ico|icns)$/,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]"
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]"
        }
      }
    ]
  },
};