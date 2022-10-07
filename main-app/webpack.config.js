const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { dependencies } = require("./package.json");
const { resolve } = require("path");

const REMOTE_NAME = "main";

module.exports = {
  entry: "./src/index.ts",
  //context: resolve(__dirname, "./src"),
  output: {
    publicPath: "auto",
  },

  mode: "development",
  devServer: {
    port: 3000,
    historyApiFallback: {
      disableDotRule: true,
    },
    proxy: {
      "/apps/react_app_1": {
        target: "http://localhost:5001",
        pathRewrite: { "^/apps/react_app_1": "" },
      },
      "/apps/react_app_2": {
        target: "http://localhost:5002",
        pathRewrite: { "^/apps/react_app_2": "" },
      },
      "/apps/vue_app_1": {
        target: "http://localhost:5011",
        pathRewrite: { "^/apps/vue_app_1": "" },
      },
      "/apps/vue_app_2": {
        target: "http://localhost:5012",
        pathRewrite: { "^/apps/vue_app_2": "" },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                paths: [
                  resolve(__dirname, "../src"),
                  resolve(__dirname, "../node_modules/antd"),
                ],
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: REMOTE_NAME,
      library: {
        type: "var",
        name: REMOTE_NAME,
      },

      remotes: {
        react_app_1: "react_app_1",
        react_app_2: "react_app_2",
        vue_app_1: "vue_app_1",
        vue_app_2: "vue_app_2",
      },
      shared: {
        ...dependencies,
        react: {
          singleton: true,
          requiredVersion: dependencies["react"],
        },
        "react-dom": {
          singleton: true,
          requiredVersion: dependencies["react-dom"],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  target: "web",
};
