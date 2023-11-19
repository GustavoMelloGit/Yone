import { defaultErrors } from '../src/defaultErrors';
import { Schema } from '../src/index';

describe('Required Validator', () => {
  it('should throw error if required field does not follow rules of a required value', async () => {
    const schema = new Schema({ role: '' });
    const wrapper = () => schema.validate('role').required();
    expect(wrapper).toThrow();
  });

  it('should not throw error if required field follow rules of a required value', async () => {
    const schema = new Schema({ role: 'admin' });
    const wrapper = () => schema.validate('role').required();
    expect(wrapper).not.toThrow();
  });

  it('should be able to set a custom error message', async () => {
    const customErrorMessage = 'FIELD IS NOT CORRECT';
    const schema = new Schema({ role: null });
    const wrapper = () => schema.validate('role').required(customErrorMessage);
    expect(wrapper).toThrow(customErrorMessage);
  });

  it('should be able to nest with other validations', async () => {
    const schema = new Schema({ role: 'admin', nonRequired: null });
    const wrapper = () => {
      schema.validate('role').required().string();
    };
    expect(wrapper).not.toThrow();
  });

  it('should throw default error message if no custom message is given', async () => {
    const schema = new Schema({ role: null });
    const wrapper = () => schema.validate('role').required();
    expect(wrapper).toThrow(defaultErrors.isRequired('role'));
  });
});
