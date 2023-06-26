const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const webpack = require("webpack");
const { ModuleFederationPlugin } = webpack.container;
const deps = require("./package.json").dependencies;
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

module.exports = {
  entry: path.join(__dirname, "src", "index.tsx"),
  // output: { publicPath: "http://localhost:3001/", filename: "index.bundle.js" },
  // mode: "development",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /bootstrap\.js$/,
        loader: "bundle-loader",
        options: {
          lazy: true,
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ["file-loader"],
      },

      // {
      //   test:/\.html$/i,
      //   loader: "html-loader",
      // },
      // {
      //   test:/\.css$/i,
      //   use: [
      //     "style-loader",
      //     {
      //       loader:"css-loader",
      //       options: {
      //         modules: true,
      //       }
      //     }
      //   ]
      // },
      // {
      //   test: /\.(png|jpeg|gif|jp2|webp)$/i,
      //   loader: 'file-loader',
      //   options:
      //   { name: "assets/[name].[ext]",}
      // },
      // {
      //   test: /\.tsx?$/,
      //   use: "ts-loader",
      //   exclude: '/node_modules/',
      // },
      // {
      //   test: /\.(ts|js)x?$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: "babel-loader",
      //       options: {
      //         presets: [
      //           "@babel/preset-env",
      //           "@babel/preset-react",
      //           "@babel/preset-typescript",
      //         ],
      //       }
      //     }
      //   ]
      // }
    ],
  },
  devServer: {
    port: 3001,
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app1",
      filename: "remoteEntry.js",
      library: { type: "var", name: "app1" },
      exposes: {
        "./CounterApp": "./src/App",
      },
      shared: {
        ...deps,
        react: { singleton: true, requiredVersion: deps.react },
        "react-dom": {
          singleton: true,
          // eager: true,
          requiredVersion: deps["react-dom"],
        },
        // react: { singleton: true, eager: true, requiredVersion: deps.react },
        // "react-dom": {
        //   singleton: true,
        //   eager: true,
        //   requiredVersion: deps["react-dom"],
        // },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new InterpolateHtmlPlugin({
      PUBLIC_URL: "static",
    }),
    new WebpackManifestPlugin({
      fileName: "manifest.json",
    }),
  ],
};
