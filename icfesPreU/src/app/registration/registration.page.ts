import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../login/loginServices/login.service';
import{user} from '../shared/user.class';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
 user:user=new user();
 
  constructor(private authSvc: LoginService,
    private router: Router) { }

  ngOnInit() {}
async onRegister(){
  const user= await this.authSvc.onRegister(this.user);
  if (user){
    console.log('Creado exitosamente');
    
  }
} 
}
