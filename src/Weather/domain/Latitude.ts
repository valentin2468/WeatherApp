import { LatitudeNotValidError } from "./errors/LatitudeNotValidError";

export class Latitude {
  private constructor(private readonly _value: number) {}

  public static of(value: number): Latitude {
    if (value < -90 || value > 90) {
      throw new LatitudeNotValidError(value);
    }

    return new Latitude(value);
  }

  public static fromPrimitive(value: number): Latitude {
    return new Latitude(value);
  }

  public toString(): number {
    return this._value;
  }
}
