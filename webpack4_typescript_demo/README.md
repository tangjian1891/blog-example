1. npm webpack-dev-server@3.11.2 -D
每次写完都要静态打包，很麻烦。起个服务，让代码发生变化后自动编译代码(编译到内存中),虽然走的是 output 配置输出，但是不会编译出实际的 bundle.js，不过仍然可以引用。
 HMR 在 webpack 内置模块中配置插件 new webpack.HotModuleReplacementPlugin()

2. npm i raw-loader@4.0.2 -D
 可以用来加载.txt 文件，加载进去的是纯文本

3. npm i url-loader@4.1.1 file-loader@6.2.0 -D
url-loader 和 file-loader。 url-loader 可以限制文件大小，转为 DataURL。默认 8192。  
 file-loader 克隆资源： 将文件发送到输出文件夹，并返回（相对）URL。
 两个都要安装，但是配置只需要配置url-loader就行
版本差异:
在file-loader 5.0.0之后，已将esModule=true设置为默认值,在vue中src引入图片时，建议采用require('../image.png').default形式，否则会src="[object Module]" 找不到图片，且不能直接 src="../iamge.png，因为这种形式会转化为requre()但是没有default。或者在url-loader配置中手动关闭即可

5. npm i babel-loader@8.2.2  @babel/preset-env@7.15.4  @babel/core@7.15.4 -D
babel 非常重要的
vue-cli 将 babel-loader @babel/preset-env(预设环境，很重要的一个) @babel/core 三个包合在了一起，叫 @vue/cli-plugin-babel
注意:需要有 .browserslistrc 加持，这样可以自动检查需要转换的版本

6. npm i vue-loader@15.9.8 vue-template-compiler@2.6.11  解析.vue 文件   需要安装 vue-loader 和 vue-template-compiler 注意vue-template-comiler需要和实际的vue版本保持一致
https://vue-loader.vuejs.org/zh/guide/#手动设置 , 单SFC特性可以去vue-loader文档查看

7. npm i webpack-bundle-analyzer@4.4.2 -D
依赖可视化分析。vue-cli有自带的vue ui 更强大

8. 排除依赖。webpack内置配置
externals: {
  vue: "Vue", //key 是 package.json 中的依赖名，value 是实际使用的变量
},

9. 别名配置 resolve.alias中配置即可
https://cli.vuejs.org/zh/guide/html-and-static-assets.html#url-转换规则
别名@只在模板中，js引入中可以使用，  在css中是无法使用的。  如果使用 ~开头，后面的内容可以当模块解析

10.内置插件 webpack.DefinePlugin可更改环境变量
