const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const { HotModuleReplacementPlugin, DefinePlugin } = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: "./dist", //开发服务器所在目录，将index.html放入，是为了默认访问index.html，dev-server模式下，不会产出实际的bundle.js，但是仍可引用，并live reloading代码(注意:这里不会通知浏览器，仍然需要你手动刷新)
    hot: true,
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.txt$/,
        use: "raw-loader",
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: false,
            // esModule:false //注意开关
          },
        },
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"], //bable转换
          },
        },
      },

      {
        test: /\.css$/,
        use: ["style-loader", "vue-style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    // new BundleAnalyzerPlugin(), //分析插件
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template:"./public/index.html"
    }),
    new HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("可以直接改写这个，但是在vue-cli中是不允许的"),
      beijjing: JSON.stringify("北京"),
    }),
  ],
  externals: {
    vue: "Vue", //排除依赖
  },
  resolve: {
    // externals:['.ts','.tsx','.js'],
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      //别名配置
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
};
