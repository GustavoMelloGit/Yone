export type SchemaObj = Record<string, unknown>;

export type SchemaFuncs = {
  string: (error?: string) => SchemaFuncs;
};

export type ISchema<T extends SchemaObj> = {
  validate: (field: keyof T) => SchemaFuncs;
};
