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
    app: ['./src/renderer/renderer.tsx'],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    // Copy necessary files that won't be in the .js bundle
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'src/index.html'),
      to: path.resolve(__dirname, 'dist/index.html'),
    }]),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/renderer/index.html")
    })
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
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader?sourceMap", "sass-loader?sourceMap"]
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

/*
let mainConfig = {
  mode: "production",
  entry: "./main.ts",
  target: "electron-main",
  output: {
    filename: "main.bundle.js",
    path: __dirname + "/dist"
  },
  node: {
    __dirname: false,
    __filename: false
  },
  resolve: {
    extensions: [".js", ".json", ".ts"]
  },
  module: {
    rules: [{
        // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
        test: /\.(ts)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader"
        }
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
  }
};

let rendererConfig = {
  mode: "production",
  entry: "./src/renderer/renderer.tsx",
  target: "electron-renderer",
  output: {
    filename: "renderer.bundle.js",
    path: __dirname + "/dist"
  },
  node: {
    __dirname: false,
    __filename: false
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
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader?sourceMap", "sass-loader?sourceMap"]
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
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/renderer/index.html")
    })
  ]
};
*/