import { Injectable } from '@angular/core';

// Firebase
import { AngularFireAuth } from '@angular/fire/auth';

// User
import { user } from '../../shared/user.class';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public isLogged: any = false;

  constructor(public afAuth: AngularFireAuth) {
    // tslint:disable-next-line: no-shadowed-variable
    afAuth.authState.subscribe((user) => (this.isLogged = user));
  }
  // login
  // tslint:disable-next-line: no-shadowed-variable
  async onLogin(user: user) {
    try {
      return await this.afAuth.signInWithEmailAndPassword(
        user.email,
        user.password
      );
    } catch (error) {
      console.log('Error on login', error);
    }
  }
  // register
  // tslint:disable-next-line: no-shadowed-variable
  async onRegister(user: user) {
    try {
      return await this.afAuth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
    } catch (error) {
      console.log('Error on register', error);
    }
  }
}
