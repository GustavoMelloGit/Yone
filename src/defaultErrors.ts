export const defaultErrors = {
  notString: (field: string) => `${field} is not a string`,
  notNumber: (field: string) => `${field} is not a number`,
  isRequired: (field: string) => `${field} is required`,
} as const;
