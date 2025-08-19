const request = require("supertest");
const app = require("../src/app");
const store = require("../src/models/taskStore");

beforeEach(() => {
  store.reset();
});

test("GET /health", async () => {
  const res = await request(app).get("/health");
  expect(res.statusCode).toBe(200);
  expect(res.body.status).toBe("ok");
});

test("POST /tasks cria uma tarefa", async () => {
  const res = await request(app).post("/tasks").send({ title: "Estudar Jest" });
  expect(res.statusCode).toBe(201);
  expect(res.body.id).toBe(1);
  expect(res.body.title).toBe("Estudar Jest");
  expect(res.body.done).toBe(false);
});

test("POST /tasks requer title", async () => {
  const res = await request(app).post("/tasks").send({});
  expect(res.statusCode).toBe(400);
  expect(res.body.error).toMatch(/title/);
});

test("GET /tasks lista tarefas", async () => {
  await request(app).post("/tasks").send({ title: "T1" });
  await request(app).post("/tasks").send({ title: "T2" });
  const res = await request(app).get("/tasks");
  expect(res.statusCode).toBe(200);
  expect(res.body.length).toBe(2);
});

test("PUT /tasks/:id atualiza tarefa", async () => {
  await request(app).post("/tasks").send({ title: "T1" });
  const res = await request(app).put("/tasks/1").send({ done: true });
  expect(res.statusCode).toBe(200);
  expect(res.body.done).toBe(true);
});

test("DELETE /tasks/:id remove tarefa", async () => {
  await request(app).post("/tasks").send({ title: "T1" });
  const del = await request(app).delete("/tasks/1");
  expect(del.statusCode).toBe(204);
  const res = await request(app).get("/tasks");
  expect(res.body.length).toBe(0);
});
