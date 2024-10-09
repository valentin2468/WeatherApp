export class TemperatureNotValidError extends Error {
  constructor(temperature: number) {
    super(`Temperature ${temperature} is not valid`);
  }
}
