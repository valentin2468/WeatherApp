import { describe } from "node:test";
import { WeatherRepositoryStub } from "../../shared/infrastructure/test/WeatherRepositoryStub";
import {
  GetWeatherByLatAndLng,
  GetWeatherByLatAndLngDTO,
} from "./GetWeatherByLatAndLng";
import { WeatherNotFoundError } from "../../shared/application/errors/WeatherNotFoundByLatAndLngError";
import { Weather } from "../domain/Weather";
import { GetWeatherError } from "../../shared/application/errors/GetWeatherError";

describe("GetWeatherByLatAndLng", () => {
  let getWeatherByLatAndLng: GetWeatherByLatAndLng;
  let weatherRepository: WeatherRepositoryStub;
  beforeAll(() => {
    weatherRepository = new WeatherRepositoryStub();
    getWeatherByLatAndLng = new GetWeatherByLatAndLng(weatherRepository);
  });
  beforeEach(() => {
    weatherRepository.clean();
  });
  describe("When weather is not found for given lat and lng parameters", () => {
    it("Should throw an error", async () => {
      // Arrange
      const dto: GetWeatherByLatAndLngDTO = { lat: 0, lng: 0 };
      // Act
      await expect(
        getWeatherByLatAndLng.execute({ lat: 0, lng: 0 })
      ).rejects.toThrow(new WeatherNotFoundError(dto.lat, dto.lng));
    });
  });
  describe("When an error occurs while fetching weather", () => {
    it("Should throw an error", async () => {
      // Arrange
      const dto: GetWeatherByLatAndLngDTO = { lat: 0, lng: 0 };
      const weatherRepositorySpy = jest.spyOn(
        weatherRepository,
        "getWeatherByLatAndLng"
      );
      weatherRepositorySpy.mockRejectedValueOnce(new Error());
      // Act
      await expect(
        getWeatherByLatAndLng.execute({ lat: 0, lng: 0 })
      ).rejects.toThrow(new GetWeatherError());
      // Assert
      expect(weatherRepositorySpy).toHaveBeenCalledWith(dto.lat, dto.lng);
    });
  });
  describe("When weather is found for given lat and lng parameters", () => {
    it("Should return the weather", async () => {
      // Arrange
      const validWeather = Weather.fromPrimitive({
        city: "Valencia",
        description: "Sunny",
        humidity: 0,
        latitude: 0,
        longitude: 0,
        temperature: 0,
      });
      const dto: GetWeatherByLatAndLngDTO = { lat: 0, lng: 0 };
      weatherRepository.add(validWeather);
      const weatherRepositorySpy = jest.spyOn(
        weatherRepository,
        "getWeatherByLatAndLng"
      );
      const weather = await weatherRepository.getWeatherByLatAndLng(
        dto.lat,
        dto.lng
      );
      // Act
      const result = await getWeatherByLatAndLng.execute(dto);
      // Assert
      expect(weatherRepositorySpy).toHaveBeenCalledWith(dto.lat, dto.lng);
      expect(result).toEqual(weather.toPrimitive());
    });
  });
});
