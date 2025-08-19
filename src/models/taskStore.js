let tasks = [];
let nextId = 1;

function list() {
  return tasks;
}

function get(id) {
  return tasks.find((t) => t.id === id);
}

function create({ title, description = "" }) {
  const task = {
    id: nextId++,
    title,
    description,
    done: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  return task;
}

function update(id, data) {
  const task = get(id);
  if (!task) return null;
  if (data.title !== undefined) task.title = data.title;
  if (data.description !== undefined) task.description = data.description;
  if (data.done !== undefined) task.done = data.done;
  // Campos para simulação de mudança de escopo
  if (data.priority !== undefined) task.priority = data.priority;
  if (data.dueDate !== undefined) task.dueDate = data.dueDate;
  return task;
}

function remove(id) {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return false;
  tasks.splice(idx, 1);
  return true;
}

function reset() {
  tasks = [];
  nextId = 1;
}

module.exports = { list, get, create, update, remove, reset };
