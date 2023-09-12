import { Given, When, Then } from '@cucumber/cucumber';
import axios from 'axios';
import { Assertion, assert } from 'chai';

let email: String = '';
let password: String = '';
let _token: string = '';
Given('un login', () => {
  // Write code here that turns the phrase above into concrete actions
  email = 'REX@hotmail.com';
  password = '123';
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

  // console.log(token);
});

Then('devolvera un token', () => {
  // Write code here that turns the phrase above into concrete actions
  assert.isNotEmpty(_token);
});
