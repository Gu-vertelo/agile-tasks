const express = require("express");
const app = express();
app.use(express.json());

let tasks = [];
let nextId = 1;

// Create
app.post("/api/tasks", (req, res) => {
  const { title, done = false, priority } = req.body || {};
  if (!title || typeof title !== "string") {
    return res.status(400).json({ error: "title é obrigatório (string)" });
  }
  if (priority && !["low", "medium", "high"].includes(priority)) {
    return res.status(400).json({ error: "priority deve ser low|medium|high" });
  }
  const task = { id: nextId++, title, done, ...(priority ? { priority } : {}) };
  tasks.push(task);
  return res.status(201).json(task);
});

// Read (lista)
app.get("/api/tasks", (_req, res) => {
  res.json(tasks);
});

// Read (uma)
app.get("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: "task não encontrada" });
  res.json(task);
});

// Update
app.put("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: "task não encontrada" });

  const { title, done, priority } = req.body || {};
  if (title !== undefined && typeof title !== "string") {
    return res.status(400).json({ error: "title deve ser string" });
  }
  if (done !== undefined && typeof done !== "boolean") {
    return res.status(400).json({ error: "done deve ser boolean" });
  }
  if (priority !== undefined && !["low", "medium", "high"].includes(priority)) {
    return res.status(400).json({ error: "priority deve ser low|medium|high" });
  }

  tasks[idx] = {
    ...tasks[idx],
    ...(title !== undefined ? { title } : {}),
    ...(done !== undefined ? { done } : {}),
    ...(priority !== undefined ? { priority } : {})
  };
  res.json(tasks[idx]);
});

// Delete
app.delete("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = tasks.length;
  tasks = tasks.filter(t => t.id !== id);
  if (tasks.length === before) return res.status(404).json({ error: "task não encontrada" });
  res.status(204).send();
});

// util p/ testes
app._reset = () => { tasks = []; nextId = 1; };

module.exports = app;
