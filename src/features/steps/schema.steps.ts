import { Given, When, Then } from '@cucumber/cucumber';
import axios, { AxiosError } from 'axios';
import { Assertion, assert } from 'chai';
import Ajv, { ErrorObject } from 'ajv';
import { schemaCorrectLogin } from '../json-schema/res-login';
const ajv = new Ajv();
let data: string = '';

Given('un inicio de sesion', () => {
  // Write code here that turns the phrase above into concrete actions
  data = '';
});

When(
  'se ingresa el usuario {string} y la contraseña {string}',
  async (email, password) => {
    try {
      // Write code here that turns the phrase above into concrete actions
      const resp = await axios.post('http://localhost:3000/users/login', {
        email,
        password,
      });
      data = resp.data;
    } catch (error: any) {
      data = error.response.data;
    }
  }
);

Then('estructura correcta del token', () => {
  // Write code here that turns the phrase above into concrete actions
  const validate = ajv.compile(schemaCorrectLogin);
  // Validar la respuesta con el JSON Schema
  const isValid = validate(data);

  assert.isTrue(isValid);
});
