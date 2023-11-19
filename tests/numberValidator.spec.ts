import { ValidationError } from '../src/ValidationError';
import { defaultErrors } from '../src/defaultErrors';
import { Yone } from '../src/index';

const numberField = 'years';
const stringField = 'role';

describe('Number Validator', () => {
  it('should throw error if field value is not a number', async () => {
    const expectedError = new ValidationError(
      defaultErrors.notNumber(stringField),
      stringField
    );
    const schema = new Yone({ [stringField]: 'admin' });
    const wrapper = () => schema.validate(stringField).number();
    expect(wrapper).toThrow(expectedError);
  });

  it('should not throw error if field value is a number', () => {
    const schema = new Yone({ [numberField]: 4 });
    const wrapper = () => schema.validate(numberField).number();
    expect(wrapper).not.toThrow();
  });

  it('should be able to set a custom error message', async () => {
    const customErrorMessage = 'FIELD IS NOT CORRECT';
    const schema = new Yone({ [stringField]: 'admin' });
    const wrapper = () =>
      schema.validate(stringField).number(customErrorMessage);
    expect(wrapper).toThrow(customErrorMessage);
  });

  it('should throw default error message if no custom message is given', async () => {
    const schema = new Yone({ [stringField]: 'admin' });
    const wrapper = () => schema.validate(stringField).number();
    expect(wrapper).toThrow(defaultErrors.notNumber(stringField));
  });

  it('should accept numbers as string if the cast doest not result into a NaN', async () => {
    const schema = new Yone({ [numberField]: '10' });
    const wrapper = () => schema.validate(numberField).number();
    expect(wrapper).not.toThrow();
  });

  it('should be able to set maximum value for number', async () => {
    const maxValue = 12;
    const expectedError = new ValidationError(
      defaultErrors.moreThenMaxValue(maxValue, numberField),
      numberField
    );
    const schema = new Yone({ [numberField]: 18 });
    const wrapper = () => schema.validate(numberField).number().max(maxValue);
    expect(wrapper).toThrow(expectedError);
  });

  it('should not throw error if value is less then maximum value', async () => {
    const maxValue = 12;
    const schema = new Yone({ [numberField]: 10 });
    const wrapper = () => schema.validate(numberField).number().max(maxValue);
    expect(wrapper).not.toThrow();
  });

  it('should be able to set minimum value for number', async () => {
    const minValue = 18;
    const expectedError = new ValidationError(
      defaultErrors.lessThenMinValue(minValue, numberField),
      numberField
    );
    const schema = new Yone({ [numberField]: 12 });
    const wrapper = () => schema.validate(numberField).number().min(minValue);
    expect(wrapper).toThrow(expectedError);
  });

  it('should not throw error if value is greater then minimum value', async () => {
    const minValue = 18;
    const schema = new Yone({ [numberField]: 20 });
    const wrapper = () => schema.validate(numberField).number().min(minValue);
    expect(wrapper).not.toThrow();
  });

  it('should be able to set a error message for min value', async () => {
    const minValue = 18;
    const customErrorMessage = 'FIELD IS NOT CORRECT';
    const schema = new Yone({ [numberField]: 14 });
    const wrapper = () =>
      schema
        .validate(numberField)
        .number(customErrorMessage)
        .min(minValue, customErrorMessage);
    expect(wrapper).toThrow(customErrorMessage);
  });

  it('should be able to set a error message for max value', async () => {
    const maxValue = 12;
    const customErrorMessage = 'FIELD IS NOT CORRECT';
    const schema = new Yone({ [numberField]: 14 });
    const wrapper = () =>
      schema
        .validate(numberField)
        .number(customErrorMessage)
        .max(maxValue, customErrorMessage);
    expect(wrapper).toThrow(customErrorMessage);
  });
});
