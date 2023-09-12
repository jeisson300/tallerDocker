import { Given, When, Then } from '@cucumber/cucumber';
import axios from 'axios';
import { Assertion, assert } from 'chai';
import Ajv, { ErrorObject } from 'ajv';
const ajv = new Ajv();
let data: string = '';

const schemaCorrect = {
  type: 'object',
  properties: {
    error: {
      type: 'null',
    },
    data: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
        },
      },
      required: ['token'],
    },
  },
  required: ['error', 'data'],
};

Given('un inicio de sesion', () => {
  // Write code here that turns the phrase above into concrete actions
  data = '';
});

When(
  'se ingresa el usuario {string} y la contraseña {string}',
  async (email, password) => {
    // Write code here that turns the phrase above into concrete actions
    const resp = await axios.post('http://localhost:3000/users/login', {
      email,
      password,
    });
    data = resp.data;
  }
);

Then('estructura correcta del token', () => {
  // Write code here that turns the phrase above into concrete actions
  const validate = ajv.compile(schemaCorrect);
  // Validar la respuesta con el JSON Schema
  const isValid = validate(data);

  assert.isTrue(isValid);
});
