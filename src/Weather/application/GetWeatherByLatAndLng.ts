import { GetWeatherError } from "../../shared/application/errors/GetWeatherError";
import { WeatherNotFoundError } from "../../shared/application/errors/WeatherNotFoundByLatAndLngError";
import { Latitude } from "../domain/Latitude";
import { Longitude } from "../domain/Longitude";
import { Weather, WeatherPrimitive } from "../domain/Weather";
import { WeatherRepository } from "../domain/WeatherRepository";

export type GetWeatherByLatAndLngDTO = {
  lat: number;
  lng: number;
};

export class GetWeatherByLatAndLng {
  constructor(private weatherRepository: WeatherRepository) {}

  async execute(dto: GetWeatherByLatAndLngDTO): Promise<WeatherPrimitive> {
    const { lat, lng } = dto;
    const latitude = Latitude.of(lat);
    const longitude = Longitude.of(lng);
    let weather: Weather;
    try {
      weather = await this.weatherRepository.getWeatherByLatAndLng(
        latitude,
        longitude
      );
    } catch (error) {
      console.error(error);
      throw new GetWeatherError();
    }
    if (!weather) {
      throw new WeatherNotFoundError(lat, lng);
    }

    return weather.toPrimitive();
  }
}
