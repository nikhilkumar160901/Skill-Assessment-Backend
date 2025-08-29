const request = require("supertest");
const app = require("../src/app");

describe("Auth routes", () => {
  let userEmail = `test${Date.now()}@example.com`;

  it("should register user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "Test User", email: userEmail, password: "123456" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
  });

  it("should login user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: userEmail, password: "123456" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
