export type SchemaObj = Record<string, unknown>;

export type YoneFuncs = {
  string: (error?: string) => YoneFuncs;
  required: (error?: string) => YoneFuncs;
  number: (error?: string) => WithNumberFuncs<YoneFuncs>;
};

export type MaxNumberFuncReturn = YoneFuncs & {
  min: (minValue: number, error?: string) => MinNumberFuncReturn;
};
export type MinNumberFuncReturn = YoneFuncs & {
  max: (maxValue: number, error?: string) => MaxNumberFuncReturn;
};

export type WithNumberFuncs<T> = T & MaxNumberFuncReturn & MinNumberFuncReturn;

export interface IYone<T extends SchemaObj> {
  validate: (field: keyof T) => YoneFuncs;
}
