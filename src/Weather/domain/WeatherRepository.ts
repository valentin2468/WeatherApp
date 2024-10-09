import { Weather } from "./Weather";

export interface WeatherRepository {
  getWeatherByLatAndLng(lat: number, lng: number): Promise<Weather>;
}
