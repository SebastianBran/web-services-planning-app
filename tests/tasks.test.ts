import "reflect-metadata";

import {
  api,
  getUserToken,
  getAllNamesFromTasks,
  databaseManager,
  server,
} from "./helpers";

let userToken: string;

describe("Tasks test", () => {
  beforeAll(async () => {
    const connection = await databaseManager.getConnection();
    await connection.synchronize(true);
    userToken = await getUserToken();
  });

  afterAll(async () => {
    server.close();
    const connection = await databaseManager.getConnection();
    await connection.destroy();
  });

  describe("POST task", () => {
    const postTaskUrl = "/api/tasks";

    it("Request without token", async () => {
      const newTask = {
        name: "Test task",
        description: "Test description",
        status: "TO_DO",
      };

      await api.post(postTaskUrl).send(newTask).expect(401);
    });

    it("Create valid task", async () => {
      const newTask = {
        name: "Test task",
        description: "Test description",
        status: "TO_DO",
      };

      await api
        .post(postTaskUrl)
        .set("Authorization", `Bearer ${userToken}`)
        .send(newTask)
        .expect(201);

      const { names } = await getAllNamesFromTasks();

      expect(names).toContain(newTask.name);
    });

    it("Create task without name", async () => {
      const newTask = {
        description: "Test description",
        status: "TO_DO",
      };

      await api
        .post(postTaskUrl)
        .set("Authorization", `Bearer ${userToken}`)
        .send(newTask)
        .expect(400);
    });

    it("Create task without description", async () => {
      const newTask = {
        name: "Test task",
        status: "TO_DO",
      };

      await api
        .post(postTaskUrl)
        .set("Authorization", `Bearer ${userToken}`)
        .send(newTask)
        .expect(400);
    });

    it("Create task without status", async () => {
      const newTask = {
        name: "Test task",
        description: "Test description",
      };

      await api
        .post(postTaskUrl)
        .set("Authorization", `Bearer ${userToken}`)
        .send(newTask)
        .expect(400);
    });

    it("Create task with invalid status", async () => {
      const newTask = {
        name: "Test task",
        description: "Test description",
        status: "INVALID_STATUS",
      };

      await api
        .post(postTaskUrl)
        .set("Authorization", `Bearer ${userToken}`)
        .send(newTask)
        .expect(400);
    });
  });

  describe("GET all tasks", () => {
    const getAllTasksUrl = "/api/tasks";

    it("Request without token", async () => {
      await api.get(getAllTasksUrl).expect(401);
    });

    it("Tasks are returned as json and status 200", async () => {
      await api
        .get(getAllTasksUrl)
        .set("Authorization", `Bearer ${userToken}`)
        .expect(200)
        .expect("Content-Type", /json/);
    });
  });

  describe("GET by Id task", () => {
    const getTaskByIdUrl = "/api/tasks/:id";

    it("Request without token", async () => {
      const { response } = await getAllNamesFromTasks();

      await api
        .get(getTaskByIdUrl.replace(":id", response.body.result[0].id))
        .expect(401);
    });

    it("Task is returned as json and status 200", async () => {
      const { response } = await getAllNamesFromTasks();

      await api
        .get(getTaskByIdUrl.replace(":id", response.body.result[0].id))
        .set("Authorization", `Bearer ${userToken}`)
        .expect(200)
        .expect("Content-Type", /json/);
    });

    it("Get task with invalid id", async () => {
      const invalidId = 99999;

      await api
        .get(getTaskByIdUrl.replace(":id", invalidId.toString()))
        .set("Authorization", `Bearer ${userToken}`)
        .expect(404)
        .expect("Content-Type", /json/);
    });
  });

  describe("UPDATE task", () => {
    const updateTaskUrl = "/api/tasks/:id";

    it("Request without token", async () => {
      const updateTask = {
        name: "Update task",
        description: "Update description",
        status: "IN_PROGRESS",
      };

      await api.put("/api/tasks").send(updateTask).expect(401);
    });

    it("Update valid task", async () => {
      const updateTask = {
        name: "Update task",
        description: "Update description",
        status: "IN_PROGRESS",
      };

      const { response } = await getAllNamesFromTasks();

      await api
        .put(updateTaskUrl.replace(":id", response.body.result[0].id))
        .set("Authorization", `Bearer ${userToken}`)
        .send(updateTask)
        .expect(201);

      const { names } = await getAllNamesFromTasks();

      expect(names).toContain(updateTask.name);
    });

    it("Update task with invalid id", async () => {
      const updateTask = {
        name: "Update task",
        description: "Update description",
        status: "IN_PROGRESS",
      };
      const invalidId = 99999;

      await api
        .put(updateTaskUrl.replace(":id", invalidId.toString()))
        .set("Authorization", `Bearer ${userToken}`)
        .send(updateTask)
        .expect(404);

      const { names } = await getAllNamesFromTasks();

      expect(names).toContain(updateTask.name);
    });

    it("Update task without name", async () => {
      const updateTask = {
        description: "Update description",
        status: "IN_PROGRESS",
      };

      const { response } = await getAllNamesFromTasks();

      await api
        .put(updateTaskUrl.replace(":id", response.body.result[0].id))
        .set("Authorization", `Bearer ${userToken}`)
        .send(updateTask)
        .expect(400);
    });

    it("Update task without description", async () => {
      const updateTask = {
        name: "Update task",
        status: "IN_PROGRESS",
      };

      const { response } = await getAllNamesFromTasks();

      await api
        .put(updateTaskUrl.replace(":id", response.body.result[0].id))
        .set("Authorization", `Bearer ${userToken}`)
        .send(updateTask)
        .expect(400);
    });

    it("Update task without status", async () => {
      const updateTask = {
        name: "Update task",
        description: "Update description",
      };

      const { response } = await getAllNamesFromTasks();

      await api
        .put(updateTaskUrl.replace(":id", response.body.result[0].id))
        .set("Authorization", `Bearer ${userToken}`)
        .send(updateTask)
        .expect(400);
    });

    it("Update task with invalid status", async () => {
      const updateTask = {
        name: "Update task",
        description: "Update description",
        status: "INVALID_STATUS",
      };

      const { response } = await getAllNamesFromTasks();

      await api
        .put(updateTaskUrl.replace(":id", response.body.result[0].id))
        .set("Authorization", `Bearer ${userToken}`)
        .send(updateTask)
        .expect(400);
    });
  });

  describe("DELETE task", () => {
    const deleteTaskUrl = "/api/tasks/:id";

    it("Request without token", async () => {
      const { response } = await getAllNamesFromTasks();

      await api
        .delete(deleteTaskUrl.replace(":id", response.body.result[0].id))
        .expect(401);
    });

    it("Delete task with invalid id", async () => {
      const invalidId = 99999;

      await api
        .delete(deleteTaskUrl.replace(":id", invalidId.toString()))
        .set("Authorization", `Bearer ${userToken}`)
        .expect(404);
    });

    it("Delete task with valid id", async () => {
      let { response } = await getAllNamesFromTasks();
      const task = response.body.result[0];

      await api
        .delete(deleteTaskUrl.replace(":id", task.id))
        .set("Authorization", `Bearer ${userToken}`)
        .expect(200);

      let { names } = await getAllNamesFromTasks();

      expect(names).not.toContain(task.name);
    });
  });
});
