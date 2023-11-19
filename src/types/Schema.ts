export type SchemaObj = Record<string, unknown>;

export type YoneFuncs = {
  string: (error?: string) => YoneFuncs;
  required: (error?: string) => YoneFuncs;
  number: (error?: string) => YoneFuncs;
};

export type IYone<T extends SchemaObj> = {
  validate: (field: keyof T) => YoneFuncs;
};
