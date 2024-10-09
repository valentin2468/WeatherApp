import request from "supertest";
import app from "./index";

describe("GET /api/weather", () => {
  it("should return weather data when lat and lng are provided", async () => {
    const response = await request(app)
      .get("/api/weather")
      .query({ lat: "41.4", lng: "2.17" })
      .expect(200);

    expect(response.body).toHaveProperty("city");
    expect(response.body).toHaveProperty("description");
  });

  it("should return a 500 error when lat doesn't pass the domain validation for this VO", async () => {
    const response = await request(app)
      .get("/api/weather")
      .query({ lat: "91", lng: "2.17" })
      .expect(500);

    expect(response.text).toEqual("Something went wrong");
  });
  it("should return a 500 error when lng doesn't pass the domain validation for this VO", async () => {
    const response = await request(app)
      .get("/api/weather")
      .query({ lat: "41.4", lng: "181" })
      .expect(500);

    expect(response.text).toEqual("Something went wrong");
  });
  it("should return a 400 error when lat is not a number", async () => {
    const response = await request(app)
      .get("/api/weather")
      .query({ lat: "a", lng: "2.17" })
      .expect(400);

    expect(response.text).toEqual("Provide valid lat and lmg params");
  });
  it("should return a 400 error when lng is not a number", async () => {
    const response = await request(app)
      .get("/api/weather")
      .query({ lat: "41.4", lng: "a" })
      .expect(400);

    expect(response.text).toEqual("Provide valid lat and lmg params");
  });
  it("should return a 400 error when lat is not provided", async () => {
    const response = await request(app)
      .get("/api/weather")
      .query({ lng: "2.17" })
      .expect(400);

    expect(response.text).toEqual("Provide valid lat and lmg params");
  });
  it("should return a 400 error when lng is not provided", async () => {
    const response = await request(app)
      .get("/api/weather")
      .query({ lat: "41.4" })
      .expect(400);

    expect(response.text).toEqual("Provide valid lat and lmg params");
  });
  it("should return a 405 error when using a different method", async () => {
    const response = await request(app)
      .post("/api/weather")
      .query({ lat: "41.4", lng: "2.17" })
      .expect(405);

    expect(response.text).toEqual('{"error":"Method Not Allowed"}');
  });
  it("should return a 404 error when using a different path", async () => {
    const response = await request(app)
      .get("/api/other")
      .query({ lat: "41.4", lng: "2.17" })
      .expect(404);

    expect(response.text).toEqual('{"error":"Path Not Found"}');
  });
});
