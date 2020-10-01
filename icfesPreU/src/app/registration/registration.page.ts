import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
 username: string = "";
 password: string= "";
 confirmPassword: string="";
  constructor(
    

  ) { }

  ngOnInit() {
  }
  prosesRegister(){
    let body = {
      username: this.username,
      password: this.password,
      confirmPassword: this.password,
      aksi:"register"
    }
  }

}
