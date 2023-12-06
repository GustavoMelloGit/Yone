export type SchemaObj = Record<string, unknown>;

export interface PrimitiveValidator {
  string: (error?: string) => IStringValidator;
  number: (error?: string) => INumberValidator;
}

export interface INumberValidator {
  min: (minValue: number, error?: string) => INumberValidator;
  max: (maxValue: number, error?: string) => INumberValidator;
  required: (error?: string) => PrimitiveValidator;
}

export interface IStringValidator {
  min: (minLength: number, error?: string) => IStringValidator;
  max: (maxLength: number, error?: string) => IStringValidator;
  required: (error?: string) => PrimitiveValidator;
}

export interface IYone {
  validate: (field: string) => PrimitiveValidator;
}
