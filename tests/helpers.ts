import supertest from "supertest";
import { container } from "tsyringe";
import { app, server } from "../src/index";
import DatabaseManager from "../src/lib/database/DatabaseManager";


const api = supertest(app);

let accessToken: string = "";

const registerUser = async () => {
  await api.post("/api/auth/register").send({
    name: "Test User",
    email: "testEmail@test.com",
    password: "Te$tPassword123",
    role: "USER"
  });
}

const getUserToken = async () => {
  if (accessToken === "") {
    await registerUser();
    const response = await api.post("/api/auth/login").send({
      email: "testEmail@test.com",
      password: "Te$tPassword123",
    });
    accessToken = response.body.result.accessToken;
  }

  return accessToken;
}

const getAllNamesFromTasks = async () => {
  const userToken = await getUserToken();
  const response = await api.get("/api/tasks").set("Authorization", `Bearer ${userToken}`);
  return { 
    response,
    names: response.body.result.map((task: { name: any; }) => task.name)
  };
}

const databaseManager: DatabaseManager = container.resolve(DatabaseManager);

export {
  api,
  getUserToken,
  getAllNamesFromTasks,
  databaseManager,
  server
};