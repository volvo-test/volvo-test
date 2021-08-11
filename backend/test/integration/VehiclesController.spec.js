const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");
const expect = require("chai").expect;

describe("VehiclesController", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterEach(async () => {
    await connection.destroy();
  });

  it("Should be able to create a new Vehicle", async () => {
    const response = await request(app).post("/vehicles").send({
      color: "white",
      type: "truck",
      series: "1",
    });

    expect(response.statusCode).to.equal(201);
    expect(response.body).to.have.property("id");
  });
});
