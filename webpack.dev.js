const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

function getConfig(name, extension = "ts") {
  return ({
    entry: `./src/${name}/${name}.${extension}`,
    target: `electron-${name}`,
    output: {
      filename: `${name}.bundle.js`,
      path: __dirname + "/dist"
    },
    mode: "development",
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
  })
}

let mainConfig = {
  ...getConfig("main")
};

let rendererConfig = {
  ...getConfig("renderer", "tsx"),
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/renderer/index.html")
    })
  ]
};

module.exports = [mainConfig, rendererConfig];