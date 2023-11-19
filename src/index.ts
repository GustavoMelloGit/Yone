const defaultErrors = {
  notString: 'field is not a string',
};

type SchemaObj = Record<string, unknown>;
type SchemaFuncs = {
  string: (error?: string) => SchemaFuncs;
};

type ISchema<T extends SchemaObj> = {
  validate: (field: keyof T) => SchemaFuncs;
};

export class Schema<T extends SchemaObj> implements ISchema<T> {
  private readonly values: T;
  private field!: keyof T;

  constructor(private readonly receivedValues: T) {
    this.values = this.receivedValues;
  }

  validate(field: keyof T): SchemaFuncs {
    this.field = field;

    return this.returnFuncs();
  }

  private returnFuncs(): SchemaFuncs {
    return {
      string: this.stringVerifier,
    };
  }

  private stringVerifier(error?: string): SchemaFuncs {
    const isString = typeof this.values[this.field] === 'string';
    if (!isString) throw new Error(error ?? defaultErrors.notString);

    return this.returnFuncs();
  }
}

type Values = {
  role: string;
};

const defaultValue: Values = {
  role: 'test-role',
};
const validationSchema = new Schema<Values>(defaultValue);
validationSchema.validate('role').string();
