import { Given, When, Then } from '@cucumber/cucumber';
import axios, { AxiosError } from 'axios';
import { Assertion, assert } from 'chai';
import Ajv, { ErrorObject } from 'ajv';
import { schemaCorrectLogin } from '../json-schema/res-login';
import { schemaBadLogin } from '../json-schema/res-bad-login';
import { faker } from '@faker-js/faker';
const ajv = new Ajv();
let data: string = '';
const randomPassword = faker.internet.password();
const randomEmail = faker.internet.email();

Given('un inicio de sesion', () => {
  // Write code here that turns the phrase above into concrete actions
});

When(
  'se ingresa el usuario {string} y la contraseña {string}',
  async (email, password) => {
    try {
      if (email === '' && password === '') {
        const resp = await axios.post('http://localhost:3000/users/login', {
        randomEmail,
        randomPassword,
      });  
      }
      // Write code here that turns the phrase above into concrete actions
      const resp = await axios.post('http://localhost:3000/users/login', {
        email,
        password,
      });
      data = resp.data;
    } catch (error:any) {
      data = error.response.data;
    }
  }
);

Then('estructura correcta del token', () => {
  // Write code here that turns the phrase above into concrete actions
  let validate = ajv.compile(schemaCorrectLogin);
  // Validar la respuesta con el JSON Schema
  let isValid = validate(data);
  if (isValid == false) {
    validate = ajv.compile(schemaBadLogin);
    isValid = validate(data);
  }
  assert.isTrue(isValid);
});