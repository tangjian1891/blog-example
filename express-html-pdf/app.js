const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const ejs = require("ejs");
const { jsPDF } = require("jspdf");
var pdf=require("html-pdf")
const formidableMiddleware = require("express-formidable");
// 处理数据接收
app.use(formidableMiddleware()); //使用了中间件，就不能使用req.on('data')接收了，会被中间件提前消费掉

// 处理接收数据。 说那个npm i formidable 即可
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// 常用的api
/**
 * req.url 是请求的路径。例如:/haha/qwer/do?address=%E5%8C%97%E4%BA%AC&age=25&file=
 * req.query express自动解析url上的key=value
 */

// 对应01
// app.use("/", async (req, res) => {
//   console.log(req.url)
//   console.log(req.query);
//   res.end("返回值");
// });

// 对应02(无中间件接收body中的二进制流)   无论前端怎么过来，都是二进制来，通过中间件放入body中(有的中间件可能会区分file对象放到req.files中)
// app.use("/", async (req, res) => {
//   console.log(req.query); //post请求过来时，表单中的数据不会在query上了,除非手动放值
//   console.log(req.body); //所有|在请求体中的数据，都是二进制流数据进来。需要手动监听接收
//   let bufArr = [];
//   await new Promise((r) => {
//     req.on("data", (e) => {
//       bufArr.push(e);
//     });
//     req.on("end", () => {
//       const buf = Buffer.concat(bufArr);
//       console.log(buf.toString()); //这里就能看到最终的数据了。 实际上和get一致，也是key=value形式,并且被urlEncode编码。
//       // 后续就需要自己放入req.body中， 一般也不会手动放入，一般也是靠中间件处理好了，咱们直接从req.body里面拿
//       r(); //结束
//     });
//   });
//   res.end("返回值");
// });

// 对应02（使用中间件解析请求体body的数据，插件不同，不一定会放入,req.body中）
// app.use("/", async (req, res) => {
//   console.log(req.query); //post请求过来时，表单中的数据不会在query上了,除非手动放值
//   console.log(req.body); //所有|在请求体中的数据，都是二进制流数据进来。需要手动监听接收
//   // req.fields; // contains non-file fields
//   // req.files; // contains files
//   console.log(req.fields); //express-formidable 普通字段在fields上
//   console.log(req.files); //文件字段在files上
//   res.end("返回值");
// });

// 对应01ajax

// app.use("/", async (req, res) => {
//   console.log(req.query); //post请求过来时，表单中的数据不会在query上了,除非手动放值
//   console.log(req.body); //所有|在请求体中的数据，都是二进制流数据进来。需要手动监听接收
//   // req.fields; // contains non-file fields
//   // req.files; // contains files
//   console.log(req.fields); //express-formidable 普通字段在fields上
//   console.log(req.files); //文件字段在files上
//   res.end("返回值");
// });
// app.post("/getpdf", async (req, res) => {
app.get("/movies", async (req, res) => {
  // console.log('进入');

  // res.end("返回值");
  // res.render('index', {foo: 'FOO'});
  //定义需要渲染到HTML页面中的电影列表
  let movies = [
    {
      name: "斗战胜佛之大圣之泪",
      brief:
        "成为斗战胜佛的孙悟空竟被怨灵蛊惑，唐三藏遭遇灭顶之灾！危急关头，孙悟空揪出怨灵源头，却发现她竟是与自己有三百年缘分的天人界女神——“幸运星”！为了找出“幸运星”黑化的原因，拯救唐三藏，孙悟空踏上了一场回到过去之旅，却最终流下了一滴眼泪。大圣之泪，为何而流，为谁而流？",
      author: "钟智行 Frankie Chung",
    },
    {
      name: "猎谎者",
      brief:
        "三个月前，某市发生了一起恶性绑架杀人案。三个月后，凶手与被害人都死于车祸。初出茅庐的女警韩烨找到了案件的幸存者林超凡，向他求证案件发生的经过。但随着调查的深入，韩烨发现林超凡的很多证词都存在漏洞，再三逼问之下，林超凡无奈坦白了另一个版本的故事，但案件真相远没有这么简单，几乎每个人都在说谎，而故事也开始不断反转。",
      author: "廉欣 Xin Lian",
    },
    {
      name: "天启大爆炸",
      brief:
        "《天启大爆炸》以中国古代曾真实发生的神秘爆炸为原型，加以天马行空的巧妙构思，为观众解封至今困惑世人的隐秘真相。神秘机构“夜行司”追踪离奇谜团勇闯“无相城”，一场关乎百姓苍生命运博弈就此展开。",
      author: "黄羿 Yi Huang / 曾黎",
    },
  ];
  fs.readFile("./views/movies.ejs", (error, data) => {
    // console.log(data.toString());
    html = ejs.render(data.toString(), { movies });
    // console.log(html);
    // res.end(html);
    // console.log(jsPDF);
      // let div= document.createElement('div')
      // div.innerHTML=html
      var options = { format: 'Letter' };
    pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
      if (err) return console.log(err);
      console.log(res); // { filename: '/app/businesscard.pdf' }
    });
    res.end("123");
  });
  //渲染数据并返回html.movies是我们定义的movies.ejs文件
  // res.render("movies", { movies: movies });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
// https://blog.csdn.net/younglao/article/details/77746039
// const express = require("express");
// const bodyParser = require("body-parser");
// const formidableMiddleware = require('express-formidable');
// const app = express();
// app.use(formidableMiddleware());
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: false }));
// // app.use(bodyParser.multipart());
// // app.use(express.bodyParser());
// const port = 3000;

// app.use("/", async (req, res) => {
//   console.log("请求来了", req.url, req.method);
//   res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
//   if (req.method === "OPTIONS") {
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//     res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.send("ok");
//   } else {
//     console.log(req.body);
//     console.log(req.file);
//     let reqData = [];
//     let size = 0;
//     // await new Promise((resolve, reject) => {
//     //   req.on("data", (data) => {
//     //     console.log(">>>req on", data);
//     //     reqData.push(data);
//     //     size += data.length;
//     //   });
//     //   req.on("end", function () {
//     //     // console.log("end");
//     //     const data = Buffer.concat(reqData, size);
//     //     // console.log("data:", size, data.toString());
//     //     console.log(data.toString())
//     //     req.file = data.toString();
//     //     console.log(req.file)
//     //     console.log(req.file.age)
//     //     resolve();
//     //   });
//     // });
//     console.log(req.fields,'查看一下字段')
//     // console.log(req.file)
//     res.send("Hello World!");
//   }
// });
