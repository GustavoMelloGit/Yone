import { ValidateError } from '../src/ValidateError';
import { defaultErrors } from '../src/defaultErrors';
import { Schema } from '../src/index';

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
