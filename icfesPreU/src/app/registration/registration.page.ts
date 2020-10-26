import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../login/loginServices/login.service';
import {user} from '../shared/user.class';

// Forms
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';

// Alert
import { AlertController } from '@ionic/angular';

// Database Firebase
import { AngularFireDatabase } from '@angular/fire/database';

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
    public alertController: AlertController,
    private db: AngularFireDatabase,
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
    ],
    password2: [
      { type: 'required', message: 'La contraseña debe ser igual a la anterior.' },
      { type: 'minlength', message: 'La contraseña debe contener minimo 8 caracteres. Con una mayuscula, un digito especial (!@#$%*^&) y un número.' }
    ]
  };

  static passwordsMatch(cg: FormGroup): {[err: string]: any} {
    const pwd1 = cg.get('password');
    const pwd2 = cg.get('password2');
    const rv: {[error: string]: any} = {};
    if ((pwd1.touched || pwd2.touched) && pwd1.value !== pwd2.value) {
      rv.passwordMismatch = true;
    }
    return rv;
  }

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
      ])
      ),
      password2: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.maxLength(30),
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%*^&]).{8,}')
      ])),
      lastName: ['', Validators.required],
      name: ['', Validators.required],
    }, {validator: RegistrationPage.passwordsMatch});
  }

  async onRegister(){
    // tslint:disable-next-line: no-shadowed-variable
    const user = await this.authSvc.onRegister(this.user);
    if (user){
      this.presentAlert();
      this.db.database.ref('user/' + user.user.uid).push(this.validations_form.value);
      this.router.navigateByUrl('/home');
    }else{
      this.router.navigateByUrl('/login');
      this.presentAlert2();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-alert',
      message: 'Bienvenido ' + this.validations_form.get('name').value + ' ' + this.validations_form.get('lastName').value,
      buttons: ['Gracias']
    });
    await alert.present();
  }

  async presentAlert2() {
    const alert = await this.alertController.create({
      cssClass: 'my-alert',
      message: 'La dirección de correo electrónico ya existe',
      buttons: ['Ok']
    });
    await alert.present();
  }

  togglePasswordText() {
    this.showpassword = !this.showpassword;
  }

}
