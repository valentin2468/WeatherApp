export class HumidityNotValidError extends Error {
  constructor(humidity: number) {
    super(`Humidity ${humidity} is not valid`);
  }
}
