import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './loginServices/login.service';
import { user } from '../shared/user.class';

// Alert
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  showPassword: boolean;
  passwordToggleIcon = 'eye-off';

  user: user = new user();

  constructor(
    private router: Router,
    private authSvc: LoginService,
    public alertController: AlertController,
    ) {}

  ngOnInit(): void {}

  togglePassword(): void{
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon === 'eye'){
      this.passwordToggleIcon = 'eye-off';
    }else{
      this.passwordToggleIcon = 'eye';
    }
  }

  async onLogin() {
    // tslint:disable-next-line: no-shadowed-variable
    const user = await this.authSvc.onLogin(this.user);
    if (user) {
      console.log('Succesfull');
      this.router.navigateByUrl('/home');
    }else{
      this.presentAlert();
    }
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-alert',
      header: 'Alerta',
      message: 'La dirección de correo electrónico o la contraseña que has introducido no son correctas.',
      buttons: ['Ok']
    });
    await alert.present();
  }
}
