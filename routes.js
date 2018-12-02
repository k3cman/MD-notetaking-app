const express = require("express");
const router = express.Router();
const notes = "./notes.json";
const fs = require("fs");

router.get("/all", (req, res) => {
  const content = fs.readFileSync(notes);
  const pars = JSON.parse(content);
  const titles = pars.map(o => {
    return o.title;
  });
  res.status(200).json(titles);
});

router.get("/file/:title", (req, res) => {
  const title = req.params.title;
  const content = fs.readFileSync(notes);
  const jsonContent = JSON.parse(content);
  const markdown = jsonContent.find(obj => obj.title === title);
  res.status(200).json(markdown);
});

router.post("/post", (req, res) => {
  const title = req.body.title;
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const text = req.body.text;
  const jsonStr = { title: title, date: `${day}-${month}-${year}`, text: text };
  fs.readFile(notes, (err, data) => {
    var json = JSON.parse(data);
    json.push(jsonStr);
    fs.writeFile(notes, JSON.stringify(json), err => {
      if (!err) res.status({ success: true });
    });
  });
});

module.exports = router;
