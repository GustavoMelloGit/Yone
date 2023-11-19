export const defaultErrors = {
  notString: (field: string) => `${field} is not a string`,
  notNumber: (field: string) => `${field} is not a number`,
  isRequired: (field: string) => `${field} is required`,
  lessThenMinValue: (minValue: number, field: string) =>
    `${field} is less then the minimal value ${minValue}`,
  moreThenMaxValue: (maxValue: number, field: string) =>
    `${field} is greater then the maximum value ${maxValue}`,
} as const;
