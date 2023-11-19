import { ValidateError } from './ValidateError';
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
      throw new ValidateError(
        `Field '${String(validateField)}' does not exist in the schema`
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
    };
  }

  private stringValidator(error?: string): SchemaFuncs {
    const isString = typeof this.values[this.field] === 'string';
    if (!isString)
      throw new ValidateError(
        error ?? defaultErrors.notString(String(this.field))
      );

    return this.returnFuncs();
  }
}
