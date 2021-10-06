const express = require("express");
const formidable = require("formidable");
const app = express();

const formidableMiddleware = require("express-formidable");
// 处理数据接收
app.use(formidableMiddleware()); //使用了中间件，就不能使用req.on('data')接收了，会被中间件提前消费掉

// 处理接收数据。 说那个npm i formidable 即可
app.use(express.static("public"));

app.use("/", async (req, res) => {
  console.log(req.query); //post请求过来时，表单中的数据不会在query上了,除非手动放值
  console.log(req.body); //所有|在请求体中的数据，都是二进制流数据进来。需要手动监听接收
  console.log(req.fields); //express-formidable 普通字段在fields上
  console.log(req.files); //文件字段在files上
  if (req.url === "/getCss1.css") {
    // res.end("返回值");
    console.log("捕获了");
    setTimeout(() => {
      res.end("h1{color: red;}");
    }, 2000);
  } else if (req.url === "/getCss2.css") {
    // res.end("返回值");
    console.log("捕获了");
    setTimeout(() => {
      res.end("h1{color: blue;}");
    }, 8000);
  } else if (req.url === "/getJs.js") {
    // res.end("返回值");
    console.log("捕获了");
    setTimeout(() => {
      res.end("console.log('来了');");
    }, 5000);
  }else if (req.url === "/getJs1.js") {
    // res.end("返回值");
    console.log("捕获了");
    setTimeout(() => {
      res.end("console.log('来了1');");
    }, 10000);
  } else {
    res.end("返回值");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
