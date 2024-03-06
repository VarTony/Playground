import Ajv from 'ajv';
import addFormats from "ajv-formats";
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const validator = (data, validator) => {
  const isValid = validator(data);
  if (!isValid) {
    console.error(validateClient.errors);
    throw new Error('Validation failed');
  }
}

const clientSchema = {
    type: 'object',
    properties: {
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      // mainEmail: { type: 'string', format: 'email', nullable: true },
      // mainphone: { type: 'string' },
      phone: { 
        type: 'string',
      },
      email: { 
        type: 'string',
        format: 'email'
      },
      dateOfBirth: {
        type: 'string',
        format: 'date'
      }
    },
    required: ['firstName', 'lastName', 'dateOfBirth', 'phone', 'email'],
    additionalProperties: false
};

const validateClient = ajv.compile(clientSchema);


export { validateClient, validator }