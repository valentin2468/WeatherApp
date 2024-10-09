import { Description } from "./Description";
import { Humidity } from "./Humidity";
import { Latitude } from "./Latitude";
import { Longitude } from "./Longitude";
import { Temperature } from "./Temperature";
import { City } from "./City";

export type WeatherPrimitive = {
  temperature: number;
  humidity: number;
  description: string;
  longitude: number;
  latitude: number;
  city: string;
};

export class Weather {
  private constructor(
    private city: City,
    private longitude: Longitude,
    private latitude: Latitude,
    private temperature: Temperature,
    private humidity: Humidity,
    private description: Description
  ) {}

  public static create({
    temperature,
    humidity,
    description,
    longitude,
    latitude,
    city,
  }: WeatherPrimitive): Weather {
    return new Weather(
      City.of(city),
      Longitude.of(longitude),
      Latitude.of(latitude),
      Temperature.of(temperature),
      Humidity.of(humidity),
      Description.of(description)
    );
  }

  public toPrimitive(): WeatherPrimitive {
    return {
      city: this.city.toString(),
      longitude: this.longitude.toString(),
      latitude: this.latitude.toString(),
      temperature: this.temperature.toString(),
      humidity: this.humidity.toString(),
      description: this.description.toString(),
    };
  }

  public static fromPrimitive({
    description,
    humidity,
    temperature,
    latitude,
    longitude,
    city,
  }: WeatherPrimitive): Weather {
    return new Weather(
      City.fromPrimitive(city),
      Longitude.fromPrimitive(longitude),
      Latitude.fromPrimitive(latitude),
      Temperature.fromPrimitive(temperature),
      Humidity.fromPrimitive(humidity),
      Description.fromPrimitive(description)
    );
  }
}
