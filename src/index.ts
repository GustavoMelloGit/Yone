import { ValidationError } from './ValidateError';
import { defaultErrors } from './defaultErrors';
import { type IYone, type SchemaObj, type YoneFuncs } from './types/Schema';

export class Yone<T extends SchemaObj> implements IYone<T> {
  private readonly values: T;
  private field!: keyof T;

  constructor(private readonly receivedValues: T) {
    this.values = this.receivedValues;
  }

  validate(validateField: keyof T): YoneFuncs {
    if (!this.hasField(validateField)) {
      throw new ValidationError(
        `Field '${String(validateField)}' does not exist in the schema`,
        String(this.field)
      );
    }
    this.field = validateField;
    return this.returnFuncs();
  }

  private hasField(field: keyof T): boolean {
    return field in this.values;
  }

  private returnFuncs(): YoneFuncs {
    return {
      string: this.stringValidator.bind(this),
      required: this.requiredValidator.bind(this),
      number: this.numberValidator.bind(this),
    };
  }

  private stringValidator(error?: string): YoneFuncs {
    const isString = typeof this.values[this.field] === 'string';
    if (!isString)
      throw new ValidationError(
        error ?? defaultErrors.notString(String(this.field)),
        String(this.field)
      );

    return this.returnFuncs();
  }

  private numberValidator(error?: string): YoneFuncs {
    const valueAsNumber = Number(this.values[this.field]);

    if (Number.isNaN(valueAsNumber)) {
      throw new ValidationError(
        error ?? defaultErrors.notNumber(String(this.field)),
        String(this.field)
      );
    }

    return this.returnFuncs();
  }

  private requiredValidator(error?: string): YoneFuncs {
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
