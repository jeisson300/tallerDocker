import { Given, When, Then } from '@cucumber/cucumber';
import axios from 'axios';
import { Assertion, assert } from 'chai';
import { faker } from '@faker-js/faker';

let email: String = '';
let password: String = '';
let _token: string = '';
const randomPassword = faker.internet.password();
const randomEmail = faker.internet.email();
Given('un login', () => {
  // Write code here that turns the phrase above into concrete actions
  /*     email = 'REX@hotmail.com';
    password = '123'; */
  email = randomEmail;
  password = randomPassword;
});

When('se ingresa email y password', async () => {
  // Write code here that turns the phrase above into concrete actions

  const resp = await axios.post('http://localhost:3000/users/login', {
    email,
    password,
  });
  const { data } = resp.data;
  const { token } = data;
  _token = token;
});

When(
  'se ingresa email {string} y password {string}',
  async (_email: string, _password: string) => {
    // Write code here that turns the phrase above into concrete actions

    // console.log(password);
    if (_email.length > 0) {
      email = _email;
      password = _password;
    }

    const resp = await axios.post('http://localhost:3000/users/login', {
      email,
      password,
    });
    const { data } = resp.data;
    const { token } = data;
    _token = token;

    // console.log(token);
  }
);

Then('devolvera un token', () => {
  // Write code here that turns the phrase above into concrete actions
  assert.isNotEmpty(_token);
});
