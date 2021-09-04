const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const { HotModuleReplacementPlugin } = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: "./dist", //开发服务器所在目录，将index.html放入，是为了默认访问index.html，dev-server模式下，不会产出实际的bundle.js，但是仍可引用，并live reloading代码(注意:这里不会通知浏览器，仍然需要你手动刷新)
    hot: true,
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: [, "css-loader"],
      // },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.txt$/,
        use: "raw-loader",
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: false,
            // esModule:false
          },
        },
      },
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   use: {
      //     loader: "file-loader",
      //     options: {
           
      //     },
      //   },
      // },
      {
        test: /\.exec\.js$/,
        use: "script-loader",
      },

      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },

      {
        test: /\.css$/,
        use: ["style-loader","vue-style-loader", "css-loader"],
      },
    ],
  },
  // plugins: [new HotModuleReplacementPlugin(), new VueLoaderPlugin(), new BundleAnalyzerPlugin()],
  plugins: [new HotModuleReplacementPlugin(), new VueLoaderPlugin()],
  externals: {
    vue: "Vue",
  },
};
