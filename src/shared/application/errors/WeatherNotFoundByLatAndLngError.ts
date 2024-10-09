export class WeatherNotFoundError extends Error {
  constructor(lat: number, lng: number) {
    super(`Weather not found by lat <${lat}> and lng <${lng}>`);
  }
}
