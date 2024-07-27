const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();
const PORT = 3003;

// CORS 설정
app.use(cors());

app.get("/api/jobs", (req, res) => {
  const jobsFilePath = path.join(__dirname, "jobs.json");
  fs.readFile(jobsFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "데이터를 읽어오지 못했습니다." });
    }
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`서버 작동 http:www.localhost:${PORT}`);
});
