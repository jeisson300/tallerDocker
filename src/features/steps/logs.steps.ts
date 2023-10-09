import { Given, When, Then } from '@cucumber/cucumber';
import axios, { AxiosError } from 'axios';
import { Assertion, assert } from 'chai';
import Ajv, { ErrorObject } from 'ajv';
import { schemaSearch } from '../json-schema/resp-search';
import { User } from '../../interface/user';
const ajv = new Ajv();
let user: User;

Given('La api cargada', () => {
  // Write code here that turns the phrase above into concrete actions
});

When(
  'se realiza la petición a la api de logs',
  async (id: string) => {
    axios.get();
  }
);

Then('devuelve el listado de los logs en json', () => {
  
});
