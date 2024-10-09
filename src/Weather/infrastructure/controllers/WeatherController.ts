import { GetWeatherByLatAndLng } from "../../application/GetWeatherByLatAndLng";
import { Request, Response } from "express";

export class WeatherController {
  constructor(private getWeatherByLatAndLng: GetWeatherByLatAndLng) {}

  public async getWeather(req: Request, res: Response) {
    const { lat, lng } = req.query as { lat: string; lng: string };
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    if (!this.isValidParams(latitude, longitude)) {
      res.status(400).send("Provide valid lat and lmg params");
      return;
    }
    try {
      const weather = await this.getWeatherByLatAndLng.execute({
        lat: latitude,
        lng: longitude,
      });
      res.json(weather);
      return;
    } catch (error) {
      console.error(error);
      res.status(500).send("Something went wrong");
      return;
    }
  }

  private isValidParams(lat: number, lng: number): boolean {
    if (isNaN(Number(lat)) || isNaN(Number(lng))) {
      return false;
    }
    return true;
  }
}
