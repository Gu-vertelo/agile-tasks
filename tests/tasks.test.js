const request = require("supertest");
const app = require("../src/app");

beforeEach(() => app._reset());

test("cria e lista tarefas", async () => {
  const create = await request(app).post("/api/tasks").send({ title: "Estudar ES" });
  expect(create.statusCode).toBe(201);
  expect(create.body).toHaveProperty("id");
  expect(create.body.title).toBe("Estudar ES");

  const list = await request(app).get("/api/tasks");
  expect(list.statusCode).toBe(200);
  expect(Array.isArray(list.body)).toBe(true);
  expect(list.body.length).toBe(1);
});

test("validações de entrada", async () => {
  const badTitle = await request(app).post("/api/tasks").send({ title: 123 });
  expect(badTitle.statusCode).toBe(400);

  const badPriority = await request(app).post("/api/tasks").send({ title: "x", priority: "urgent" });
  expect(badPriority.statusCode).toBe(400);
});

test("update e delete", async () => {
  const { body } = await request(app).post("/api/tasks").send({ title: "Ler docs", priority: "low" });
  const id = body.id;

  const upd = await request(app).put(`/api/tasks/${id}`).send({ done: true, priority: "high" });
  expect(upd.statusCode).toBe(200);
  expect(upd.body.done).toBe(true);
  expect(upd.body.priority).toBe("high");

  const del = await request(app).delete(`/api/tasks/${id}`);
  expect(del.statusCode).toBe(204);
});
