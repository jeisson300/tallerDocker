import { binding, given, then, when } from 'cucumber-tsflow';
import { assert } from 'chai';
import { User } from '../../interface/user';
import { loginUser } from '../../controller/user.controller';
import axios, { Axios } from 'axios';

@binding()
export class UserControlerSteps {
  email:String='';
  password:String='';
  error?:String;


  @given('Dado un usuario: {string} contraseña: {string}')
  public givenUserSignIn(user: String, password: String) {
    this.email = user;
    this.password = password;
  }

  @when(/\$(\d*) is sign in/)
  public async deposit() {

    // fetch("http://localhost:3000/users/login",{email, password } , "POST")
    const data = await axios.post('http://localhost:3000/users/login', {
      "email":this.email,
      "password":this.password,
    });
    console.log(data);
    //this.error = data.error;
  }

  @then(/ Get will response token \$(\d*)/)
  public accountBalanceShouldEqual() {
    // assert.equal(this.accountBalance, token);
  }
}
