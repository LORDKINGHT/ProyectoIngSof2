import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../login/loginServices/login.service';
import {user} from '../shared/user.class';

// Forms
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

type NewType = string;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  constructor(
    private authSvc: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    ) { }
user: user = new user();

// Forms

// tslint:disable-next-line: variable-name
validations_form: FormGroup;
errorMessage: NewType = '';
loading: any;
public showpassword: boolean;
  // tslint:disable-next-line: variable-name
  validation_messages = {
    email: [
      { type: 'required', message: 'El correo es requerido' },
      { type: 'pattern', message: 'Ingrese un correo valido' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es requerida' },
      { type: 'minlength', message: 'La contraseña debe contener minimo 8 caracteres. Con una mayuscula, un digito especial (!@#$%*^&) y un número.' }
    ]
  };

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([

        Validators.minLength(6),
        Validators.maxLength(30),
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$') // example : test@gmail.com
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.maxLength(30),
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%*^&]).{8,}')
      ])),
    });
  }

  async onRegister(){
    // tslint:disable-next-line: no-shadowed-variable
    const user = await this.authSvc.onRegister(this.user);
    if (user){
      const newLocal = 'Creado exitosamente';
      console.log(newLocal);
    }
  }
  togglePasswordText() {
    this.showpassword = !this.showpassword;
  }

  formSubmit(login) {
    console.log('test: ', login);
}
}
