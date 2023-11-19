import { defaultErrors } from '../src/defaultErrors';
import { Yone } from '../src/index';

describe('String Validator', () => {
  it('should throw error if field value is not a string', async () => {
    const schema = new Yone({ role: 20 });
    const wrapper = () => schema.validate('role').string();
    expect(wrapper).toThrow();
  });

  it('should not throw error if field value is a string', () => {
    const schema = new Yone({ role: 'admin' });

    const wrapper = () => schema.validate('role').string();

    expect(wrapper).not.toThrow();
  });

  it('should be able to set a custom error message', async () => {
    const customErrorMessage = 'FIELD IS NOT CORRECT';
    const schema = new Yone({ role: 1 });
    const wrapper = () => schema.validate('role').string(customErrorMessage);
    expect(wrapper).toThrow(customErrorMessage);
  });

  it('should throw default error message if no custom message is given', async () => {
    const schema = new Yone({ role: 10 });
    const wrapper = () => schema.validate('role').string();
    expect(wrapper).toThrow(defaultErrors.notString('role'));
  });
});
