import e from "express";
import { WeatherRepositoryStub } from "../../../shared/infrastructure/test/WeatherRepositoryStub";
import { GetWeatherByLatAndLng } from "../../application/GetWeatherByLatAndLng";
import { Weather } from "../../domain/Weather";
import { WeatherController } from "./WeatherController";

describe("WeatherController", () => {
  let weatherController: WeatherController;
  let weatherRepository: WeatherRepositoryStub;
  let getWeatherByLatAndLng: GetWeatherByLatAndLng;
  beforeAll(() => {
    weatherRepository = new WeatherRepositoryStub();
    getWeatherByLatAndLng = new GetWeatherByLatAndLng(weatherRepository);
    weatherController = new WeatherController(getWeatherByLatAndLng);
  });

  describe("When lat is not provided", () => {
    it("Should return 400 status code", async () => {
      // Arrange
      const req = { query: {} } as any;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as any;
      // Act
      await weatherController.getWeather(req, res);
      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("Provide valid lat and lmg params");
    });
  });
  describe("When lng is not provided", () => {
    it("Should return 400 status code", async () => {
      // Arrange
      const req = { query: { lat: "0" } } as any;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as any;
      // Act
      await weatherController.getWeather(req, res);
      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("Provide valid lat and lmg params");
    });
  });
  describe("When lat is not a number", () => {
    it("Should return 400 status code", async () => {
      // Arrange
      const req = { query: { lat: "a", lng: "0" } } as any;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as any;
      // Act
      await weatherController.getWeather(req, res);
      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("Provide valid lat and lmg params");
    });
  });
  describe("When lng is not a number", () => {
    it("Should return 400 status code", async () => {
      // Arrange
      const req = { query: { lat: "0", lng: "a" } } as any;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as any;
      // Act
      await weatherController.getWeather(req, res);
      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("Provide valid lat and lmg params");
    });
  });
  describe("When lat and lng are valid", () => {
    it("Should return the weather", async () => {
      // Arrange
      const req = { query: { lat: "0", lng: "0" } } as any;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      } as any;
      const validWeather = Weather.fromPrimitive({
        city: "Valencia",
        description: "Sunny",
        humidity: 0,
        latitude: 0,
        longitude: 0,
        temperature: 0,
      });
      const useCaseSpy = jest
        .spyOn(getWeatherByLatAndLng, "execute")
        .mockResolvedValue(validWeather.toPrimitive());
      // Act
      await weatherController.getWeather(req, res);
      // Assert
      expect(useCaseSpy).toHaveBeenCalledWith({ lat: 0, lng: 0 });
      expect(res.json).toHaveBeenCalledWith(validWeather.toPrimitive());
    });
  });
});
