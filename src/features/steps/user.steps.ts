import { Given, When, Then } from '@cucumber/cucumber';
import axios, { AxiosError } from 'axios';
import { Assertion, assert } from 'chai';
import Ajv, { ErrorObject } from 'ajv';
import { schemaSearch } from '../json-schema/resp-search';
const ajv = new Ajv();
let data: string = '';

Given('un email, se buscara un email, si existe en la base de datos', () => {
  // Write code here that turns the phrase above into concrete actions
  data = '';
});

When(
  'se ingresa el usuario {string} y la contraseña {string}',
  async (email, password) => {
    try {
      const headers = {
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUkVYIiwiaWQiOjEsImlhdCI6MTY5Mzk1NjE2OH0.h1ATTk1uX8HRQPBANQDcMRhEoAX0V21fOjX95UFiJHQ', // Ejemplo de encabezado de autorización
        'Content-Type': 'application/json', // Ejemplo de encabezado de tipo de contenido
      };
      // Write code here that turns the phrase above into concrete actions
      const resp = await axios.post(
        'http://localhost:3000/users/1',
        {},
        { headers }
      );
      data = resp.data;
    } catch (error: any) {
      data = error.response.data;
    }
  }
);

Then('el esquema es valido', () => {
  // Write code here that turns the phrase above into concrete actions
  const validate = ajv.compile(schemaSearch);
  // Validar la respuesta con el JSON Schema
  const isValid = validate(data);

  assert.isTrue(isValid);
});
