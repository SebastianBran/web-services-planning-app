import "reflect-metadata";

import { 
  api,
  databaseManager,
  server
} from "./helpers";

describe("Auth tests", () => {
  beforeAll(async () => {
    const connection = await databaseManager.getConnection();
    await connection.synchronize(true);
  });
  
  afterAll(async () => {
    server.close();
    const connection = await databaseManager.getConnection();
    await connection.destroy();
  });

  describe("Register", () => {
    const registerUrl = "/api/auth/register";
    
    it("Register a new user", async () => {
      const newUser = {
        name: "Test User 2",
        email: "testEmail2@test.com",
        password: "Te$tPassword123",
        role: "USER"
      }

      const response = await api
        .post(registerUrl)
        .send(newUser);
      expect(response.status).toBe(200);
      expect(response.body.result.accessToken).toBeDefined();
    });

    it("Register a new user with invalid email", async () => {
      const newUser = {
        name: "Test User 2",
        email: "testEmail2",
        password: "Te$tPassword123",
        role: "USER"
      }

      const response = await api.post(registerUrl).send(newUser);
      expect(response.status).toBe(400);
    });

    it("Register a new user with existing email", async () => {
      const newUser = {
        name: "Test User 2",
        email: "testEmail2@test.com",
        password: "Te$tPassword123",
        role: "USER"
      }

      const response = await api.post(registerUrl).send(newUser);
      expect(response.status).toBe(400);
    });

    it("Register a new user with invalid password", async () => {
      const newUser = {
        name: "Test User 2",
        email: "testEmail2@test.com",
        password: "testPassword",
        role: "USER"
      }

      const response = await api.post(registerUrl).send(newUser);
      expect(response.status).toBe(400);
    });

    it("Register a new user with invalid role", async () => {
      const newUser = {
        name: "Test User 2",
        email: "testEmail2@test.com",
        password: "testPassword",
        role: "INVALID_ROLE"
      }

      const response = await api.post(registerUrl).send(newUser);
      expect(response.status).toBe(400);
    });
  });

  describe("Login", () => {
    const loginUrl = "/api/auth/login";

    it("Login with valid credentials", async () => {
      const credentials = {
        email: "testEmail2@test.com",
        password: "Te$tPassword123"
      }

      const response = await api.post(loginUrl).send(credentials);
      expect(response.status).toBe(200);
      expect(response.body.result.accessToken).toBeDefined();
    });

    it("Login with invalid email", async () => {
      const credentials = {
        email: "invalidEmail",
        password: "Te$tPassword123"
      }

      const response = await api.post(loginUrl).send(credentials);
      expect(response.status).toBe(400);
    });

    it("Login with invalid password", async () => {
      const credentials = {
        email: "testEmail2@test.com",
        password: "invalidPassword"
      }

      const response = await api.post(loginUrl).send(credentials);
      expect(response.status).toBe(400);
    });
  });
});