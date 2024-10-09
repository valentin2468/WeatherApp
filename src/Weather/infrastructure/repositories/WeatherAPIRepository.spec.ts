import { before } from "node:test";
import { WeatherApiRepository } from "./WeatherAPIRepository";
import { Weather } from "../../domain/Weather";
import { WeatherAPIRequestError } from "./errors/WeatherAPIRequestError";
import { Latitude } from "../../domain/Latitude";
import { Longitude } from "../../domain/Longitude";

const VALID_API_RESPONSE = {
  coord: {
    lon: 0,
    lat: 0,
  },
  weather: [
    {
      description: "overcast clouds",
    },
  ],
  main: {
    temp: 250,
    humidity: 10,
  },
  name: "Tokio",
};

describe("WeatherAPIRepository", () => {
  let weatherAPIRepository: WeatherApiRepository;
  beforeAll(() => {
    weatherAPIRepository = new WeatherApiRepository();
    global.fetch = jest.fn();
  });
  afterEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  describe("getWeatherByLatAndLng", () => {
    it("Should call fetch with the correct params", async () => {
      // Arrange
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(VALID_API_RESPONSE),
      });
      const lat = Latitude.fromPrimitive(0);
      const lng = Longitude.fromPrimitive(0);
      const expectedUrl = `${process.env.API_BASE_URL}?lat=${lat}&lon=${lng}&appid=${process.env.API_KEY}`;
      // Act
      const weather = await weatherAPIRepository.getWeatherByLatAndLng(
        lat,
        lng
      );
      // Assert
      expect(global.fetch).toHaveBeenCalledWith(expectedUrl);
      expect(weather).toEqual(
        Weather.fromPrimitive({
          city: "Tokio",
          description: "overcast clouds",
          humidity: 10,
          latitude: 0,
          longitude: 0,
          temperature: 250,
        })
      );
    });
    it("Should throw an error when fetch fails", async () => {
      // Arrange
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Error"));
      const lat = Latitude.fromPrimitive(0);
      const lng = Longitude.fromPrimitive(0);
      // Act
      await expect(
        weatherAPIRepository.getWeatherByLatAndLng(lat, lng)
      ).rejects.toThrow(new WeatherAPIRequestError());
    });
  });
});
