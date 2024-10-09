import { DescriptionEmptyError } from "./errors/DescriptionEmptyError";
import { DescriptionTooLongError } from "./errors/DescriptionTooLongError";

export class Description {
  private constructor(private _value: string) {}

  public static of(value: string): Description {
    if (value.length < 1) {
      throw new DescriptionEmptyError();
    }
    if (value.length > 100) {
      throw new DescriptionTooLongError(value);
    }
    return new Description(value);
  }

  public static fromPrimitive(value: string): Description {
    return new Description(value);
  }

  public toString(): string {
    return this._value;
  }
}
