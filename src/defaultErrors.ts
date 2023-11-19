export const defaultErrors = {
  notString: (field: string) => `${field} is not a string`,
  isRequired: (field: string) => `${field} is required`,
} as const;
