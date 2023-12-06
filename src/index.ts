import { ValidationError } from './ValidationError';
import { defaultErrors } from './defaultErrors';
import {
  INumberValidator,
  IStringValidator,
  type IYone,
  type PrimitiveValidator,
} from './types/Schema';
import { NumberValidator } from './validators/NumberValidator';

export class Yone implements IYone {
  constructor(
    private readonly numberValidator: INumberValidator,
    private readonly stringValidator: IStringValidator
  ) {}

  validate(validateField: keyof T): PrimitiveValidator {
    if (!this.hasField(validateField)) {
      throw new ValidationError(
        `Field '${String(validateField)}' does not exist in the schema`,
        String(this.field)
      );
    }
    this.field = validateField;
    return {
      number: this.number.bind(this),
      string: this.string.bind(this),
    };
  }

  private hasField(field: keyof T): boolean {
    return field in this.values;
  }

  private string(error?: string): IStringValidator {
    const isString = typeof this.values[this.field] === 'string';
    if (!isString)
      throw new ValidationError(
        error ?? defaultErrors.notString(String(this.field)),
        String(this.field)
      );

    return this.stringValidator;
  }

  private number(error?: string): INumberValidator {
    const valueAsNumber = Number(this.values[this.field]);

    if (Number.isNaN(valueAsNumber)) {
      throw new ValidationError(
        error ?? defaultErrors.notNumber(String(this.field)),
        String(this.field)
      );
    }

    return this.numberValidator;
  }
}

function makeYoneValidator(): IYone {
  return new Yone(new NumberValidator(), new NumberValidator());
}
