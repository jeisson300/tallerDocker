import { Given, When, Then } from '@cucumber/cucumber';
import axios, { AxiosError } from 'axios';
import { Assertion, assert } from 'chai';
import Ajv, { ErrorObject } from 'ajv';
import { schemaSearch } from '../json-schema/resp-search';
import { User } from '../../interface/user';
const ajv = new Ajv();
let user: User;

Given('un id, se validara si existe en la base de datos el usuario', () => {
  // Write code here that turns the phrase above into concrete actions
});

When(
  'enviamos un id {string} de usuario, para buscar el usuario',
  async (id: string) => {
    try {
      const headers = {
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUkVYIiwiaWQiOjEsImlhdCI6MTY5NTE2NjUwNH0.TXlvCLNikLkR7U6JnvEWdB5NnRinFMUCuzdvfm3HvVE', // Ejemplo de encabezado de autorización
        'Content-Type': 'application/json', // Ejemplo de encabezado de tipo de contenido
      };
      // Write code here that turns the phrase above into concrete actions
      const resp = await axios.get(`http://localhost:3000/users/${id}`, {
        headers,
      });
      user = resp.data.data;
    } catch (error: any) {
      // data = error.response.data;
    }
  }
);

Then('hay informacion', () => {
  assert.isNotEmpty(user);
});
