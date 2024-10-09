import { Latitude } from "../../../Weather/domain/Latitude";
import { Longitude } from "../../../Weather/domain/Longitude";
import { Weather } from "../../../Weather/domain/Weather";
import { WeatherRepository } from "../../../Weather/domain/WeatherRepository";

export class WeatherRepositoryStub implements WeatherRepository {
  private toReturn: Weather[] = [];
  public async getWeatherByLatAndLng(
    lat: Latitude,
    lng: Longitude
  ): Promise<Weather> {
    return this.toReturn[0];
  }

  public add(weather: Weather) {
    this.toReturn.push(weather);
  }

  public clean() {
    this.toReturn = [];
  }
}
