1.每次写完都要静态打包，很麻烦。起个服务，让代码发生变化后自动编译代码(编译到内存中),虽然走的是 output 配置输出，但是不会编译出实际的 bundle.js，不过仍然可以引用。
npm webpack-dev-server@3.11.2 -D HMR 在 webpack 内置模块中 webpack.HotModuleReplacementPlugin

2.raw-loader 可以用来加载.txt 文件，加载进去的是纯文本

3.url-loader 和 file-loader。 url-loader 可以限制文件大小，转为 DataURL。默认 8192。  
4.file-loader 克隆资源： 将文件发送到输出文件夹，并返回（相对）URL

5.babel-loader.非常重要的
vue-cli 将 babel-loader @babel/preset-env(预设环境，很重要的一个) @babel/core 三个包合在了一起，叫 @vue/cli-plugin-babel
注意:需要有 .browserslistrc 加持，这样可以自动检查需要转换的版本

6.解析.vue 文件   需要安装 vue-loader 和vue-template-compiler 注意vue-template-comiler需要和实际的vue版本保持一致
https://vue-loader.vuejs.org/zh/guide/#手动设置

7.排除依赖
externals: {
vue: "Vue", //key 是 package.json 中的依赖名，value 是实际使用的变量
},
