import { HumidityNotValidError } from "./errors/HumidityNotValidError";

export class Humidity {
  private constructor(private _value: number) {}

  public static of(value: number): Humidity {
    if (value < 0 || value > 100) {
      throw new HumidityNotValidError(value);
    }
    return new Humidity(value);
  }

  public static fromPrimitive(value: number): Humidity {
    return new Humidity(value);
  }

  public toString(): number {
    return this._value;
  }
}
