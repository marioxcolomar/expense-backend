import request from "supertest";
import app from "../src/index";

describe("GET /", () => {
  it("should return server start message", async () => {
    const response = await request(app).get("/");
    expect(response).toMatchObject({ statusCode: 200, text: "Hello backend!" });
  });
});

describe("POST /expense", () => {
  it("should create a new expense", async () => {
    const response = await request(app)
      .post("/expense")
      .set("Content-Type", "application/json")
      .send({ description: "New expense", amount: 123 });
    expect(response.statusCode).toEqual(201);
    expect(response.body.message).toEqual("Expense created successfully");
    expect(response.body.data).toMatchObject({
      description: "New expense",
      amount: 123,
      category: "MEALS",
    });
  });
});

// describe('PUT /expense/:id')

// describe('GET /expenses')

// describe('DELETE /expense/:id')
