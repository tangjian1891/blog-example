const express = require("express");
const app = express();
// app.use(express.json());
// app.use(express.urlencoded());
app.use(express.static('public'))
app.use("/", async (req, res) => {
  console.log(req.url)
  console.log(req.query)
  res.end("ihao啊");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
