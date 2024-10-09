export class WeatherAPIRequestError extends Error {
  constructor(message?: string) {
    super(`Error while requesting the weather API`);
  }
}
