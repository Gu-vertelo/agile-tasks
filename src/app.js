const express = require("express");
const app = express();
const tasks = require("./routes/tasks");

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/tasks", tasks);

module.exports = app;
