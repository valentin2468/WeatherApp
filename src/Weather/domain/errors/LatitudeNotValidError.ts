export class LatitudeNotValidError extends Error {
  constructor(value: number) {
    super(`Latitude <${value}> is not valid. It has to be between -90 and 90`);
  }
}
