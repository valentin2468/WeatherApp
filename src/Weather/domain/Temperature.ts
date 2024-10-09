import { TemperatureNotValidError } from "./errors/TemperatureNotValidError";

export class Temperature {
  private constructor(private _value: number) {}

  public static of(value: number): Temperature {
    // Any posible validation should be here
    // This is just an example
    if (value < -100 || value > 100) {
      throw new TemperatureNotValidError(value);
    }
    return new Temperature(value);
  }

  public static fromPrimitive(value: number): Temperature {
    return new Temperature(value);
  }

  public toString(): number {
    return this._value;
  }
}
