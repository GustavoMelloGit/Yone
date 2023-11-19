# Yone: Data Validation Library
Yone is a versatile data validation library written in TypeScript. It supports validation for various data types, including primitives, and allows you to define custom validation tests.

## Installation
To use Yone in your project, install it via npm:

```bash
npm install yone
```

## Usage
```ts
import { Yone } from 'yone';

// Create a yone with initial data
const yone = new Yone({ role: 'admin', age: 25 });

try {
  // Validate a string field
  yone.validate('role').string();

  // Validate an age field with a custom error message
  yone.validate('age').number('Age must be a number');
} catch (error) {
  console.error(error.message);
}
```
## Features
- **Type-Safe:** Yone is written in TypeScript, providing type safety during development.
- **Support for Primitives:** Easily validate strings, numbers, booleans, and other primitive data types.
- **Custom Tests:** Define custom validation tests to suit your specific requirements.

## API
### `IYone<T>` Constructor:

```ts
const yone = new Yone(initialData: T);
```
Initializes a yone with the provided data.

### `validate(field: keyof T): YoneFuncs`

```ts
yone.validate('fieldName').<validationMethod>();
```
Begins the validation process for the specified field.

### `YoneFuncs:` 
A set of validation methods available for each field, such as string, number, etc.

## Examples

Validate a String Field
```ts
yone.validate('username').string();
```
Validate a Number Field with Custom Error Message
```ts
yone.validate('age').number('Age must be a valid number');
```
Custom Validation Test
```ts
yone.validate('customField').test((value) => value > 10, 'Value must be greater than 10');
```


## Contributing
If you encounter any issues or have suggestions for improvements, feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/GustavoMelloGit/Yone/issues).

License
This project is licensed under the [MIT License](LICENSE).