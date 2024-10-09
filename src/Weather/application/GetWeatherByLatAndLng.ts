import { GetWeatherError } from "../../shared/application/errors/GetWeatherError";
import { WeatherNotFoundError } from "../../shared/application/errors/WeatherNotFoundByLatAndLngError";
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
    let weather: Weather;
    try {
      weather = await this.weatherRepository.getWeatherByLatAndLng(lat, lng);
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
