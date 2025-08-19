const express = require("express");
const router = express.Router();
const store = require("../models/taskStore");

// Validação simples
function validateTaskPayload(body) {
  if (!body || typeof body.title !== "string" || !body.title.trim()) {
    return "Campo 'title' é obrigatório e deve ser string não vazia.";
  }
  return null;
}

// Listar tarefas
router.get("/", (req, res) => {
  res.json(store.list());
});

// Buscar por ID
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = store.get(id);
  if (!task) return res.status(404).json({ error: "Tarefa não encontrada" });
  res.json(task);
});

// Criar
router.post("/", (req, res) => {
  const error = validateTaskPayload(req.body);
  if (error) return res.status(400).json({ error });
  const task = store.create({
    title: req.body.title,
    description: req.body.description || "",
  });
  res.status(201).json(task);
});

// Atualizar
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const updated = store.update(id, req.body || {});
  if (!updated) return res.status(404).json({ error: "Tarefa não encontrada" });
  res.json(updated);
});

// Remover
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const ok = store.remove(id);
  if (!ok) return res.status(404).json({ error: "Tarefa não encontrada" });
  res.status(204).send();
});

module.exports = router;
