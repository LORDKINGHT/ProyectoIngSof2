import { Component, OnInit } from '@angular/core';
// Forms
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
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
    private formBuilder: FormBuilder,
    private db: AngularFireDatabase,
    public alertController: AlertController,
  ) { }

// tslint:disable-next-line: variable-name
validations_form2: FormGroup;

public showAgregar: boolean;
public showPregunta: boolean;
  ngOnInit() {
    this.validations_form2 = this.formBuilder.group({
      A: ['', Validators.required],
      B: ['', Validators.required],
      C: ['', Validators.required],
      D: ['', Validators.required],
      rta: ['', Validators.required],
      enunciado: ['', Validators.required],
      imagen_enunciado: ['', Validators.required],
      imagen_pregunta: ['', Validators.required],
      pregunta_parte1: ['', Validators.required],
      pregunta_parte2: ['', Validators.required],
      titulo: ['', Validators.required],
    });
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

  async insertarMateria(){
    this.presentAlert();
  }

  async insertarPregunta(){
    this.presentAlert2();
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
}
