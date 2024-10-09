import express, { Request, Response, NextFunction } from "express";
import { GetWeatherByLatAndLng } from "./Weather/application/GetWeatherByLatAndLng";
import { WeatherApiRepository } from "./Weather/infrastructure/repositories/WeatherAPIRepository";
import { WeatherController } from "./Weather/infrastructure/controllers/WeatherController";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const weatherRepository = new WeatherApiRepository();
const getWeatherUseCase = new GetWeatherByLatAndLng(weatherRepository);
const weatherController = new WeatherController(getWeatherUseCase);

app.get("/api/weather", (req, res) => weatherController.getWeather(req, res));

app.all("/api/weather", (req: Request, res: Response) => {
  res.status(405).json({ error: "Method Not Allowed" });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Path Not Found" });
});
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server being executed at http://localhost:${port}`);
  });
}

export default app;
