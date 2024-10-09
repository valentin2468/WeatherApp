import { Latitude } from "./Latitude";
import { Longitude } from "./Longitude";
import { Weather } from "./Weather";

export interface WeatherRepository {
  getWeatherByLatAndLng(lat: Latitude, lng: Longitude): Promise<Weather>;
}
