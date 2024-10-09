export class City {
  private constructor(private readonly _value: string) {}

  public static of(value: string): City {
    return new City(value);
  }

  public static fromPrimitive(value: string): City {
    return new City(value);
  }

  public toString(): string {
    return this._value;
  }
}
