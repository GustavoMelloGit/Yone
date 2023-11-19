import { ValidationError } from './ValidateError';
import { defaultErrors } from './defaultErrors';
import { type ISchema, type SchemaFuncs, type SchemaObj } from './types/Schema';

export class Schema<T extends SchemaObj> implements ISchema<T> {
  private readonly values: T;
  private field!: keyof T;

  constructor(private readonly receivedValues: T) {
    this.values = this.receivedValues;
  }

  validate(validateField: keyof T): SchemaFuncs {
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

  private returnFuncs(): SchemaFuncs {
    return {
      string: this.stringValidator.bind(this),
      required: this.requiredValidator.bind(this),
      number: this.numberValidator.bind(this),
    };
  }

  private stringValidator(error?: string): SchemaFuncs {
    const isString = typeof this.values[this.field] === 'string';
    if (!isString)
      throw new ValidationError(
        error ?? defaultErrors.notString(String(this.field)),
        String(this.field)
      );

    return this.returnFuncs();
  }

  private numberValidator(_error?: string): SchemaFuncs {
    throw new ValidationError('Not implemented', 'none');
  }

  private requiredValidator(error?: string): SchemaFuncs {
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
