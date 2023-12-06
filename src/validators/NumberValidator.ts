import { ValidationError } from '../ValidationError';
import { defaultErrors } from '../defaultErrors';
import { INumberValidator } from '../types/Schema';

export class NumberValidator implements INumberValidator {
  private returnFuncs(): INumberValidator {
    return {
      min: this.min.bind(this),
      max: this.max.bind(this),
      required: this.required.bind(this),
    };
  }

  min(minValue: number, error?: string): INumberValidator {
    const value = Number(this.values[this.field]);

    if (value < minValue) {
      throw new ValidationError(
        error ?? defaultErrors.lessThenMinValue(minValue, String(this.field)),
        String(this.field)
      );
    }

    return this.returnFuncs();
  }

  max(maxValue: number, error?: string): INumberValidator {
    const value = Number(this.values[this.field]);

    if (value > maxValue) {
      throw new ValidationError(
        error ?? defaultErrors.moreThenMaxValue(maxValue, String(this.field)),
        String(this.field)
      );
    }

    return this.returnFuncs();
  }

  required(error?: string): PrimitiveValidator {
    const value = this.values[this.field];
    const invalidValues: unknown[] = [null, undefined, ''];
    if (invalidValues.includes(value))
      throw new ValidationError(
        error ?? defaultErrors.isRequired(String(this.field)),
        String(this.field)
      );

    return this.returnFuncs();
  }
}
