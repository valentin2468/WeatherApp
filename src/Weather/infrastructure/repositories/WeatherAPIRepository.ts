import { Weather, WeatherPrimitive } from "../../domain/Weather";
import { WeatherRepository } from "../../domain/WeatherRepository";
import { WeatherAPIRequestError } from "./errors/WeatherAPIRequestError";

type WeatherAPIResponse = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      description: string;
    }
  ];
  main: {
    temp: number;
    humidity: number;
  };
  name: string;
};

export class WeatherApiRepository implements WeatherRepository {
  public async getWeatherByLatAndLng(
    lat: number,
    lng: number
  ): Promise<Weather> {
    const response: WeatherAPIResponse = await fetch(
      `${process.env.API_BASE_URL}?lat=${lat}&lon=${lng}&appid=${process.env.API_KEY}`
    )
      .then((res) => {
        return res.json();
      })
      .catch((error) => {
        console.error(error);
        throw new WeatherAPIRequestError();
      });
    return Weather.fromPrimitive(
      this.mapWeatherAPIResponseToWeatherPrimitive(response)
    );
  }

  private mapWeatherAPIResponseToWeatherPrimitive(
    data: WeatherAPIResponse
  ): WeatherPrimitive {
    return {
      longitude: data.coord.lon,
      latitude: data.coord.lat,
      city: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      description: data.weather[0].description,
    };
  }
}
