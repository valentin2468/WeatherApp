import { LongitudeNotValidError } from "./errors/LongitudeNotValidError";

export class Longitude {
  private constructor(private _value: number) {}

  public static of(value: number): Longitude {
    if (value < -180 || value > 180) {
      throw new LongitudeNotValidError(value);
    }
    return new Longitude(value);
  }

  public static fromPrimitive(value: number): Longitude {
    return new Longitude(value);
  }

  public toString(): number {
    return this._value;
  }
}
