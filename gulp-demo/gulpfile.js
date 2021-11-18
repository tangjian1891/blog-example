const { series } = require("gulp");
const gulp = require("gulp");
// 3.0写法  gulp自动读取gulpfile.js文件，寻找暴露的default任务(否则报错  Task never defined: default)，手动执行任务的话， 需要gulp qwer
// gulp.task("qwer", function (done) {
//   console.log("还可以啊");
//   done();
// });

// 4.0写法，无须glup.tast包裹。 直接exports.default到处带default的函数即可
// 不支持esm导出
// export default function(){
//   console.log('heelp');
// }
// exports.default = function (done) {
//   console.log("默认导出");
//   done();
// };

function q(done) {
  console.log("q");
  done();
}
function w(done) {
  console.log("w");
  done();
}

exports.default = series(q, w);
