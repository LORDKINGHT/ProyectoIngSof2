import { Injectable } from '@angular/core';

//firebase 
import {AngularFireAuth} from '@angular/fire/auth';

//user
import{user}from '../../shared/user.class';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public isLogged: any=false;

  constructor(public afAuth: AngularFireAuth) {
  afAuth.authState.subscribe(user =>(this.isLogged= user));

}
//login
async onLogin(user:user){
  try {
    return await this.afAuth.signInWithEmailAndPassword(user.email,user.password)
  } catch (error) {
    console.log('Error on login',error)
  }
}
//register
async onRegister (user:user){
  try {
    return await this.afAuth.createUserWithEmailAndPassword(
      user.email,
      user.password)
  } catch (error) {
    console.log('Error on register',error)
    
  }
}

}