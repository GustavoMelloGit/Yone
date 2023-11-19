# Yone: Data Validation Library
Yone is a versatile data validation library written in TypeScript. It supports validation for various data types, including primitives, and allows you to define custom validation tests.

## Installation
To use Yone in your project, install it via npm:

```bash
npm install yone
```

## Usage
```ts
import { Schema } from 'yone';

// Create a schema with initial data
const schema = new Schema({ role: 'admin', age: 25 });

try {
  // Validate a string field
  schema.validate('role').string();

  // Validate an age field with a custom error message
  schema.validate('age').number('Age must be a number');
} catch (error) {
  console.error(error.message);
}
```
## Features
- **Type-Safe:** Yone is written in TypeScript, providing type safety during development.
- **Support for Primitives:** Easily validate strings, numbers, booleans, and other primitive data types.
- **Custom Tests:** Define custom validation tests to suit your specific requirements.

## API
### `Schema<T>` Constructor:

```ts
const schema = new Schema(initialData: T);
```
Initializes a schema with the provided data.

### `validate(field: keyof T): SchemaFuncs`

```ts
schema.validate('fieldName').<validationMethod>();
```
Begins the validation process for the specified field.

### `SchemaFuncs:` 
A set of validation methods available for each field, such as string, number, etc.

## Examples

Validate a String Field
```ts
schema.validate('username').string();
```
Validate a Number Field with Custom Error Message
```ts
schema.validate('age').number('Age must be a valid number');
```
Custom Validation Test
```ts
schema.validate('customField').test((value) => value > 10, 'Value must be greater than 10');
```


## Contributing
If you encounter any issues or have suggestions for improvements, feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/GustavoMelloGit/Yone/issues).

License
This project is licensed under the [MIT License](LICENSE).