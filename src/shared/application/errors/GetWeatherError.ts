export class GetWeatherError extends Error {
  constructor(message?: string) {
    super(`Could not get weather`);
  }
}
