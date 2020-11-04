import { Component, OnInit } from '@angular/core';
// Forms
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';

// Ruta
import {Router} from '@angular/router';

// Alert
import { AlertController } from '@ionic/angular';

// Database Firebase
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-set-question',
  templateUrl: './set-question.page.html',
  styleUrls: ['./set-question.page.scss'],
})
export class SetQuestionPage implements OnInit {

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private db: AngularFireDatabase,
    public alertController: AlertController,
  ) { }

// tslint:disable-next-line: variable-name
validations_form2: FormGroup;

// Variables para la BD
public addMateria: string;
public addDB: string;
public addPregunta: string;

public selectMateria: string;
public selectDB: string;
public selectPregunta: string;

// Variables Boolenas
public showAgregar: boolean;
public showPregunta: boolean;
public showDB: boolean;
public isSimulacro: boolean;
public isRepaso: boolean;

// tslint:disable-next-line: member-ordering
toggle = false;
toggle2 = false;
status = 'Enable';

  ngOnInit() {

    this.validations_form2 = this.formBuilder.group({
      A: ['', Validators.required],
      B: ['', Validators.required],
      C: ['', Validators.required],
      D: ['', Validators.required],
      enunciado: ['', Validators.required],
      imagen_enunciado: ['', Validators.required],
      imagen_pregunta: ['', Validators.required],
      pregunta_parte1: ['', Validators.required],
      pregunta_parte2: ['', Validators.required],
      rta: ['', Validators.required],
      titulo: ['', Validators.required],
    });
  }

  async changeIsRepaso(){
    // tslint:disable-next-line: triple-equals
    if (this.isRepaso == true){
      this.toggle = false;
      this.isRepaso = false;
    }else{
      this.isRepaso = true;
      this.toggle = true;
      this.toggle2 = false;
    }
  }

  async changeIsSimulacro(){
    // tslint:disable-next-line: triple-equals
    if (this.isSimulacro == true){
      this.toggle2 = false;
      this.isSimulacro = false;
    }else{
      this.isSimulacro = true;
      this.toggle2 = true;
      this.toggle = false;
    }
  }

  async changeShowAgregar(){
    // tslint:disable-next-line: triple-equals
    if (this.showAgregar == true){
      this.showAgregar = false;
    }else{
      this.showAgregar = true;
    }
  }

  async changeShowPregunta(){
    // tslint:disable-next-line: triple-equals
    if (this.showPregunta == true){
      this.showPregunta = false;
    }else{
      this.showPregunta = true;
    }
  }

  async changeShowDB(){
    // tslint:disable-next-line: triple-equals
    if (this.showDB == true){
      this.showDB = false;
    }else{
      this.showDB = true;
    }
  }

  async insertarDB(){
    this.presentAlert3();
  }

  async insertarMateria(){
    this.presentAlert();
    console.log(this.addMateria);
    this.db.database.ref('repaso/').push(this.addMateria);
  }

  async insertarPregunta(){
    this.presentAlert2();
  }

  async insertarFirebase(){
    if (this.isSimulacro){
      // tslint:disable-next-line: max-line-length
      this.db.database.ref('simulacro/' + this.selectMateria + '/' + this.selectDB + '/' + this.selectPregunta).push(this.validations_form2.value);
      this.presentAlert5();
      this.router.navigateByUrl('/home');
    }
    if (this.isRepaso){
      // tslint:disable-next-line: max-line-length
      this.db.database.ref('repaso/' + this.selectMateria + '/' + this.selectDB + '/' + this.selectPregunta).push(this.validations_form2.value);
      this.presentAlert4();
      this.router.navigateByUrl('/home');
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-alert',
      message: 'Materia Agregada',
      buttons: ['Gracias']
    });
    await alert.present();
  }

  async presentAlert2() {
    const alert = await this.alertController.create({
      cssClass: 'my-alert',
      message: 'Pregunta Agregada',
      buttons: ['Gracias']
    });
    await alert.present();
  }
  async presentAlert3() {
    const alert = await this.alertController.create({
      cssClass: 'my-alert',
      message: 'Base de datos agregada',
      buttons: ['Gracias']
    });
    await alert.present();
  }
  async presentAlert4() {
    const alert = await this.alertController.create({
      cssClass: 'my-alert',
      message: 'Datos Agregados A Repaso',
      buttons: ['Gracias']
    });
    await alert.present();
  }

  async presentAlert5() {
    const alert = await this.alertController.create({
      cssClass: 'my-alert',
      message: 'Datos Agregados A Simulacro',
      buttons: ['Gracias']
    });
    await alert.present();
  }

}
