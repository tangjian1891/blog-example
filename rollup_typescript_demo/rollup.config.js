// rollup.config.js
import typescript from "@rollup/plugin-typescript";
import server from "rollup-plugin-serve";
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "esm",
    sourcemap: true, //这神奇的sourcemap属性竟然在output.sourcemap中
  },
  plugins: [
    commonjs(),
    resolve(),
    typescript(),
    // server({
    //   contentBase: "",
    //   port:3000
    // }),
  ],
  // external:['nice-js-tools']
};

// 所有的三方包，rollup是不会默认resolve的，需要使用@rollup/plugin-node-resolve这个包才能从node_modules中找到。
// 因为有的包使用的是commonjs，所以还需要使用commonjs包转换为esm语法。


// https://juejin.cn/post/6844904058394771470#heading-24


// https://www.bilibili.com/video/BV1wK4y1S7PZ?p=4&spm_id_from=pageDriver