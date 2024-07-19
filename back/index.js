const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3001;

app.get("/api/jobs", (req, res) => {
  const jobsFilePath = path.join(__dirname, "jobs.json");
  fs.readFile(jobsFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read data" });
    }
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
