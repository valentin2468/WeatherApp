export class LongitudeNotValidError extends Error {
  constructor(value: number) {
    super(
      `Longitude <${value}> is not valid. It has to be between -180 and 180`
    );
  }
}
