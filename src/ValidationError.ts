export class ValidationError extends Error {
  field: string;

  constructor(message: string, field: string) {
    super(message);
    this.field = field;
    this.name = 'ValidationError';
  }
}
