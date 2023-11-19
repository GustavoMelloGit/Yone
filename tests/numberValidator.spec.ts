import { ValidationError } from '../src/ValidateError';
import { defaultErrors } from '../src/defaultErrors';
import { Schema } from '../src/index';

describe('Number Validator', () => {
  it('should throw error if field value is not a number', async () => {
    const expectedError = new ValidationError(
      defaultErrors.notNumber('role'),
      'role'
    );
    const schema = new Schema({ role: 'admin' });
    const wrapper = () => schema.validate('role').number();
    expect(wrapper).toThrow(expectedError);
  });

  it('should not throw error if field value is a number', () => {
    const schema = new Schema({ years: 4 });

    const wrapper = () => schema.validate('years').number();

    expect(wrapper).not.toThrow();
  });

  it('should be able to set a custom error message', async () => {
    const customErrorMessage = 'FIELD IS NOT CORRECT';
    const schema = new Schema({ role: 'admin' });
    const wrapper = () => schema.validate('role').number(customErrorMessage);
    expect(wrapper).toThrow(customErrorMessage);
  });

  it('should throw default error message if no custom message is given', async () => {
    const schema = new Schema({ role: 'admin' });
    const wrapper = () => schema.validate('role').number();
    expect(wrapper).toThrow(defaultErrors.notNumber('role'));
  });

  it('should accept numbers as string if the cast doest not result into a NaN', async () => {
    const schema = new Schema({ years: '10' });
    const wrapper = () => schema.validate('years').number();
    expect(wrapper).not.toThrow();
  });
});
