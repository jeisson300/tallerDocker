import { binding, given, then, when } from 'cucumber-tsflow';
import { assert } from 'chai';
import { User } from '../../interface/user';
import { loginUser } from '../../controller/user.controller';
import axios, { Axios } from 'axios';

@binding()
export class UserControlerSteps {
  private _user: User = {
    first_name: 'carlos',
    last_name: 'aguirre',
    email: 'carlos@hotmail.com',
    password: '123',
    id_role: 1,
    status: 1,
  };

  private status: number = 0;

  @given(/ password and email \$(\d*)/)
  public givenUserSignIn(user: User) {
    this._user = user;
  }

  @when(/\$(\d*) is sign in/)
  public async deposit(user: User) {
    const { email, password } = user;
    // fetch("http://localhost:3000/users/login",{email, password } , "POST")
    const data = await axios.post('http://localhost:3000/users/login', {
      email,
      password,
    });
    console.log(data);
  }

  @then(/ Get will response token \$(\d*)/)
  public accountBalanceShouldEqual(token: string) {
    // assert.equal(this.accountBalance, token);
  }
}
