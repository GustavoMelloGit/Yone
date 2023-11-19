import { ValidateError } from '../src/ValidateError';
import { defaultErrors } from '../src/defaultErrors';
import { Schema } from '../src/index';
describe('String Validator', () => {
  it('should throw error if field value is not a string', async () => {
    const schema = new Schema({ role: 20 });
    const wrapper = () => schema.validate('role').string();
    expect(wrapper).toThrow();
  });

  it('should not throw error if field value is a string', () => {
    const schema = new Schema({ role: 'admin' });

    const wrapper = () => schema.validate('role').string();

    expect(wrapper).not.toThrow();
  });

  it('should return which field has an error', async () => {
    const schema = new Schema({ role: 1 });
    const wrapper = () => schema.validate('role').string();
    expect(wrapper).toThrow();
  });

  it('should be able to pass a custom error message', async () => {
    const customErrorMessage = 'FIELD IS NOT CORRECT';
    const schema = new Schema({ role: 1 });
    const wrapper = () => schema.validate('role').string(customErrorMessage);
    expect(wrapper).toThrow(customErrorMessage);
  });
});

describe('Schema class', () => {
  it('should throw error if field does not exist while trying to validate it', async () => {
    const schema = new Schema({ role: 'admin' });
    //@ts-expect-error Expect years to not be keyof Schema values
    const wrapper = () => schema.validate('years').string();
    expect(wrapper).toThrow();
  });

  it('should be able to validate multiple fields at the same time with errors', async () => {
    const expectedError = new ValidateError(defaultErrors.notString('years'));
    const schema = new Schema({
      role: 'admin',
      years: 10,
      name: 'Joao',
      nickname: 'jao',
    });
    const wrapper = () => {
      schema.validate('role').string();
      schema.validate('years').string();
      schema.validate('nickname').string();
      schema.validate('nickname').string();
    };
    expect(wrapper).toThrow(expectedError);
  });

  it('should be able to validate multiple field at the same time with no errors', async () => {
    const schema = new Schema({
      role: 'admin',
      name: 'Joao',
      nickname: 'jao',
    });
    const wrapper = () => {
      schema.validate('role').string();
      schema.validate('nickname').string();
      schema.validate('nickname').string();
    };
    expect(wrapper).not.toThrow();
  });
});
