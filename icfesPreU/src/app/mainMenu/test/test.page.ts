import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QuestionsPage } from '../questions/questions.page';
import { QuestionsService } from './services/questions.service';
import { Platform } from '@ionic/angular';
import { AngularFireObject } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Router } from "@angular/router";

import { question } from '../../shared/question.class';
import { answer } from '../../shared/answer.class';
import { answers } from '../../shared/answers.class';
import { subject } from 'src/app/shared/subject.class';
import { subjectScore } from '../../shared/subjectScore.class';
import { score } from '../../shared/score.class';

// Database Firebase
import { AngularFireDatabase } from '@angular/fire/database';

// Infinite Scroll
import { IonInfiniteScroll } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { BoundElementPropertyAst } from '@angular/compiler';


@Component({
  selector: 'app-review',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit, AfterViewInit {

  // Varibales
  title = '';
  enunciadoParte1 = '';

  numQuestion = 1;
  totalNumQuestions = 1;
  listMarkQuestions: Array<number> = [];
  listAnswerQuestions: Array<string> = [];
  listRequestDB: Array<boolean> = [];
  listSubject: Array<string> = [];
  txtSubject = 'matemáticas';
  itemRef: AngularFireObject<any>;
  listQuestions: Array<question> = [];
  arguments = null;
  map = new Map<string, string>();
  letMinutes = 15;
  key = 1;
  value = 1;

  constructor(private modalCtrl: ModalController, public questionsService: QuestionsService, private route: ActivatedRoute, public alertController: AlertController, private _router: Router, private db: AngularFireDatabase) { }

  ngOnInit() {

    this.startTimer(120.60);

    this.arguments = this.route.snapshot.paramMap.get('id');
    //console.log(this.arguments);
    
    for (let i = 0; i < 4; i++){
      this.listRequestDB = this.listRequestDB.concat([false]);
    }

    this.itemRef = this.questionsService.getQuestions(this.arguments, 'matematicas');
    this.listRequestDB[0] = true;
    this.requestQuestions();
  }

  async presentAlertEnd(){
    const alert = await this.alertController.create({
      header: 'Final',
      subHeader: ' ',
      message: 'La prueba ha finalizado.',
      buttons: [{
        text: 'Terminar',
        role: 'OK',
        handler: () => {
          this._router.navigate(['/simulacrum']);
        }
      }]
    });

    await alert.present();
  }

  async presentAlertHour(){
    const alert = await this.alertController.create({
      header: '¡Atención!',
      subHeader: ' ',
      message: 'Queda 1 hora para finalizar la prueba.',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  async presentAlertMinutes(){
    const alert = await this.alertController.create({
      header: '¡Atención!',
      subHeader: ' ',
      message: 'Quedan 15 minutos para finalizar la prueba.',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  ngAfterViewInit(): void {
  }

  requestQuestions() {
    this.itemRef.snapshotChanges().subscribe(actions => {
      this.value = 1;
      for (let i = 0; i < actions.payload.numChildren(); i++) {

        let questions = new question();
        const quest = 'pregunta_' + (i + 1);

        questions.titulo = actions.payload.child(quest).child('titulo').val();
        questions.enunciadoParte1 = actions.payload.child(quest).child('enunciado_parte1').val();
        questions.imagenEnunciadoParte1 = actions.payload.child(quest).child('imagen_enunciado_parte1').val();
        questions.enunciadoParte2 = actions.payload.child(quest).child('enunciado_parte2').val();
        questions.imagenEnunciadoParte2 = actions.payload.child(quest).child('imagen_enunciado_parte2').val();
        const rango: string = actions.payload.child(quest).child('rango_enunciado').val();
        if (rango !== '') {
          const rangos: Array<string> = rango.split('-');
          questions.inicioRangoEnunciado = +rangos[0];
          questions.finRangoEnunciado = +rangos[1];

          this.map.set('' + this.key, 'Enunciado ' + questions.inicioRangoEnunciado + ' - ' + questions.finRangoEnunciado);
          this.key++;

          this.listQuestions = this.listQuestions.concat([questions]);
          this.listSubject = this.listSubject.concat([this.txtSubject]);

          questions = new question();
          questions.enunciadoParte1 = '';
        } else {
          questions.inicioRangoEnunciado = 0;
          questions.finRangoEnunciado = 0;
        }
        questions.preguntaParte1 = actions.payload.child(quest).child('pregunta_parte1').val();
        questions.preguntaParte2 = actions.payload.child(quest).child('pregunta_parte2').val();
        questions.imagenPregunta = actions.payload.child(quest).child('imagen_pregunta').val();
        questions.respuestaA = actions.payload.child(quest).child('respuesta_a').val();
        questions.respuestaB = actions.payload.child(quest).child('respuesta_b').val();
        questions.respuestaC = actions.payload.child(quest).child('respuesta_c').val();
        questions.respuestaD = actions.payload.child(quest).child('respuesta_d').val();
        questions.respuestaCorrecta = actions.payload.child(quest).child('respuesta_correcta').val();

        this.listQuestions = this.listQuestions.concat([questions]);
        this.listSubject = this.listSubject.concat([this.txtSubject]);
        this.map.set('' + this.key, '' + this.value);
        this.key++;
        this.value++;
      }

      if (!this.listRequestDB[1]) {
        this.itemRef = this.questionsService.getQuestions(this.arguments, 'lecturaCritica');
        this.listRequestDB[1] = true;
        this.txtSubject = 'lectura crítica';
        this.requestQuestions();
      } else if (!this.listRequestDB[2]) {
        this.itemRef = this.questionsService.getQuestions(this.arguments, 'socialesCiudadanas');
        this.listRequestDB[2] = true;
        this.txtSubject = 'sociales y competencias ciudadanas';
        this.requestQuestions();
      } else if (!this.listRequestDB[3]) {
        this.itemRef = this.questionsService.getQuestions(this.arguments, 'cienciasNaturales');
        this.listRequestDB[3] = true;
        this.txtSubject = 'ciencias naturales';
        this.requestQuestions();
      } else {
        this.totalNumQuestions = this.map.size;
        this.creatingSection(this.listQuestions, this.numQuestion - 1);

        //console.log(this.listQuestions);
        //console.log(this.totalNumQuestions);
        //console.log(this.map.get('1'));

        for (let i = 0; i < this.totalNumQuestions; i++) {
          this.listMarkQuestions = this.listMarkQuestions.concat([0]);
          if (this.map.get((i + 1) + '').length > 5) {
            this.listAnswerQuestions = this.listAnswerQuestions.concat(['null']);
          } else {
            this.listAnswerQuestions = this.listAnswerQuestions.concat(['']);
          }
        }
      }
    });
  }

  creatingSection(list: Array<question>, num: number) {
    const quest = list[num];
    const enunciado2: HTMLElement = document.getElementById('enunciado2');
    const section4: HTMLElement = document.getElementById('section4');
    const listAns: HTMLElement = document.getElementById('listAns');
    const labelsubject: HTMLElement = document.getElementById('subject');
    labelsubject.innerHTML = this.listSubject[this.numQuestion-1];
    if (quest.enunciadoParte1 !== '') {
      this.title = 'Enunciado para las preguntas ' + quest.inicioRangoEnunciado + ' - ' + quest.finRangoEnunciado;
      this.enunciadoParte1 = quest.enunciadoParte1;
      if (quest.enunciadoParte2 !== '') {
        // tslint:disable-next-line: max-line-length
        enunciado2.insertAdjacentHTML('beforeend', '<div id="secondText"><br/><ion-text>' + quest.enunciadoParte2 + ' </ion-text><br/></div>');
      }
      // tslint:disable-next-line: max-line-length
      listAns.style.display = 'none';
    } else {
      this.title = 'Pregunta No. ' + this.map.get((num + 1) + '');
      this.enunciadoParte1 = quest.preguntaParte1;
      if (quest.preguntaParte2 !== '') {
        // tslint:disable-next-line: max-line-length
        enunciado2.insertAdjacentHTML('beforeend', '<div id="secondText"><br/><ion-text>' + quest.preguntaParte2 + ' </ion-text><br/></div>');
      }
      const ansA = '<ion-row><ion-col size="1"><b>A.</b></ion-col><ion-col size="11">' + quest.respuestaA + '</ion-col></ion-row>';
      const ansB = '<ion-row><ion-col size="1"><b>B.</b></ion-col><ion-col size="11">' + quest.respuestaB + '</ion-col></ion-row>';
      const ansC = '<ion-row><ion-col size="1"><b>C.</b></ion-col><ion-col size="11">' + quest.respuestaC + '</ion-col></ion-row>';
      const ansD = '<ion-row><ion-col size="1"><b>D.</b></ion-col><ion-col size="11">' + quest.respuestaD + '</ion-col></ion-row>';
      // tslint:disable-next-line: max-line-length
      section4.insertAdjacentHTML('beforeend', '<ion-grid id="answer">' + ansA + ansB + ansC + ansD + '</ion-grid>');

      // tslint:disable-next-line: max-line-length
      listAns.style.display = 'block';
    }
  }

  removeHTML() {
    const answer = document.getElementById('answer');
    if (answer) {
      answer.remove();
    }
    const secondText = document.getElementById('secondText');
    if (secondText) {
      secondText.remove();
    }
    const listAnswer = document.getElementById('listAnswer');
    if (listAnswer) {
      listAnswer.remove();
    }
  }

  previousQuestion() {
    if (this.numQuestion > 1) {
      this.numQuestion--;
    }
    const elem: HTMLElement = document.getElementById('iconNext');
    const elemLabel: HTMLElement = document.getElementById('labelNext');
    const name = elem.getAttribute('name');
    if (this.numQuestion !== this.totalNumQuestions) {
      if (name === 'save-outline') {
        elem.setAttribute('name', 'caret-forward-outline');
        elemLabel.innerHTML = 'Next';
      }
    }
    this.removeHTML();
    this.creatingSection(this.listQuestions, this.numQuestion - 1);
    this.checkMarkedQuestion();
  }

  nextQuestion() {
    if (this.numQuestion < this.totalNumQuestions) {
      this.numQuestion++;
    }
    const elemIcon: HTMLElement = document.getElementById('iconNext');
    const elemLabel: HTMLElement = document.getElementById('labelNext');
    const name = elemIcon.getAttribute('name');
    if (name === 'save-outline') {
      this.endTestConfirmation();
    }
    if (this.numQuestion === this.totalNumQuestions) {
      if (name === 'caret-forward-outline') {
        elemIcon.setAttribute('name', 'save-outline');
        elemLabel.innerHTML = 'End test';
      }
    } else {
      if (name === 'save-outline') {
        elemIcon.setAttribute('name', 'caret-forward-outline');
        elemLabel.innerHTML = 'Next';
      }
    }
    this.removeHTML();
    this.creatingSection(this.listQuestions, this.numQuestion - 1);
    //console.log(this.listAnswerQuestions);
    //console.log(this.numQuestion);
    //console.log(this.totalNumQuestions - 1);
    this.checkMarkedQuestion();
  }

  async endTestConfirmation() {
    const alert = await this.alertController.create({
      header: '¡Atención!',
      subHeader: ' ',
      message: 'Esta por finalizar su prueba.',
      buttons: [{
        text: 'Aceptar',
        role: 'OK',
        handler: () => {
          this.sendTest();
        }
      }, 'Cancelar']
    });

    await alert.present();
  }

  sendTest() {
    let response = new answers();
    let responseScore = new answers();
    response.idBank = this.arguments;
    responseScore.idBank = this.arguments;
    response.idUser = '000001';
    responseScore.idUser = '000001';
    response.respuestas = new Array<subject>();
    responseScore.puntajes = new Array<subjectScore>();
    let respuesta: Array<answer> = [];
    let txtMateria = 'matemáticas';

    let numAns = 1;
    let numAnsSubject = 0;
    let numAnsCorrect = 0;
    let numAnsEmpty = 0;
    for (let i = 0; i < this.listAnswerQuestions.length; i++){
      if (this.listSubject[i] !== txtMateria) {
        let materia = new subject();
        materia.materia = txtMateria;
        materia.respuestas = respuesta;
        response.respuestas = response.respuestas.concat([materia]);

        let materiaPuntaje = new subjectScore();
        let puntaje = new score();
        puntaje.cantidadPreguntas = numAnsSubject + '';
        puntaje.cantidadAciertos = numAnsCorrect + '';
        puntaje.cantidadSinRespuesta = numAnsEmpty + '';
        puntaje.cantidadErradas = (numAnsSubject - numAnsCorrect - numAnsEmpty) + '';
        materiaPuntaje.materia = txtMateria;
        materiaPuntaje.puntajes = puntaje;
        responseScore.puntajes = responseScore.puntajes.concat([materiaPuntaje]);

        respuesta = Array<answer>();
        txtMateria = this.listSubject[i];
        numAnsSubject = 0;
        numAnsCorrect = 0;
        numAnsEmpty = 0;
      }
      if (this.listAnswerQuestions[i] !== 'null') {
        let ans = new answer;
        ans.numAns = numAns + '';
        ans.ansUser = this.listAnswerQuestions[i];
        ans.ansCorrect = this.listQuestions[i].respuestaCorrecta;
        if (ans.ansUser === ans.ansCorrect){
          ans.statusAns = 'CORRECTO';
          numAnsCorrect++;
        } else if (ans.ansUser === '') {
          ans.statusAns = 'SIN RESPUESTA';
          numAnsEmpty++;
        } else {
          ans.statusAns = 'INCORRECTO';
        }
        respuesta = respuesta.concat([ans]);
        numAns++;
        numAnsSubject++;
      }
    }

    let materia = new subject();
    materia.materia = txtMateria;
    materia.respuestas = respuesta;
    response.respuestas = response.respuestas.concat([materia]);

    let materiaPuntaje = new subjectScore();
    let puntaje = new score();
    puntaje.cantidadPreguntas = numAnsSubject + '';
    puntaje.cantidadAciertos = numAnsCorrect + '';
    puntaje.cantidadSinRespuesta = numAnsEmpty + '';
    puntaje.cantidadErradas = (numAnsSubject - numAnsCorrect - numAnsEmpty) + '';
    materiaPuntaje.materia = txtMateria;
    materiaPuntaje.puntajes = puntaje;
    responseScore.puntajes = responseScore.puntajes.concat([materiaPuntaje]);
    
    //console.log(response);
    //console.log(responseScore);
    this.db.database.ref('/correccion').push(response);
    this.db.database.ref('/puntaje').push(responseScore);
  }

  checkMarkedQuestion() {
    const elem: HTMLElement = document.getElementById('mark');
    if (this.listMarkQuestions[this.numQuestion - 1] === 0) {
      elem.setAttribute('name', 'bookmark-outline');
    } else if (this.listMarkQuestions[this.numQuestion - 1] === 1) {
      elem.setAttribute('name', 'bookmark');
    }
    this.selectedAnswer(this.listAnswerQuestions[this.numQuestion - 1]);
  }

  markQuestion() {
    const elem: HTMLElement = document.getElementById('mark');
    const name = elem.getAttribute('name');
    if (name === 'bookmark') {
      elem.setAttribute('name', 'bookmark-outline');
      this.listMarkQuestions[this.numQuestion - 1] = 0;
    } else if (name === 'bookmark-outline') {
      elem.setAttribute('name', 'bookmark');
      this.listMarkQuestions[this.numQuestion - 1] = 1;
    }
  }

  selectedAnswer(answer) {
    const classGeneric = ' Answer md button button-small button-solid ion-activatable ion-focusable hydrated';
    const parent: HTMLCollection = document.getElementsByClassName('Answer');

    for (let i = 0; i < parent.length; i++) {
      // tslint:disable-next-line: triple-equals
      if (parent.item(i).getAttribute('value') == answer) {
        parent.item(i).setAttribute('class', 'selected-answer' + classGeneric);
        this.listAnswerQuestions[this.numQuestion - 1] = answer;
      } else {
        parent.item(i).setAttribute('class', 'answer' + classGeneric);
      }
    }
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: QuestionsPage,
      componentProps: {
        numQuestion: this.numQuestion,
        map: this.map,
        listMarkQuestions: this.listMarkQuestions
      }
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (data != null) {
      this.numQuestion = data.numNewQuestion;
    }
    this.removeHTML();
    this.creatingSection(this.listQuestions, this.numQuestion - 1);
    console.log(this.listAnswerQuestions);
    this.checkMarkedQuestion();
  }

  time: BehaviorSubject<string> = new BehaviorSubject('00:00:00');

  timer: number;

  interval;

  startTimer(duration: number){
    clearInterval(this.interval);
    this.timer = duration * 60;
    this.updateTimeValue();
    this.interval = setInterval( () => {
      this.updateTimeValue()
    }, 1000);
  }

  stopTimer(){
    clearInterval(this.interval);
    this.time.next('00:00:00');
  }

  leftHour: Boolean = true;
  leftMinutes: Boolean = true;

  updateTimeValue(){
    let hours: any = this.timer / 3600;
    let minutes: any = this.timer / 60;
    let seconds: any = this.timer % 60;

    if(minutes >= 60){ minutes -= 60; }
    if(minutes >= 120){ minutes -= 120; }
    if(minutes >= 180){ minutes -= 180; }
    if(minutes >= 240){ minutes -= 240; }

    hours = String('0' + Math.floor(hours)).slice(-2);
    minutes = String('0' + Math.floor(minutes)).slice(-2);
    seconds = String('0' + Math.floor(seconds)).slice(-2);

    const text = hours + ':' + minutes + ':' + seconds;
    this.time.next(text);

    --this.timer;

    if(minutes == '59'){ //Mensaje restante para 15 minutos de prueba
      if(this.leftHour){
        this.presentAlertHour();
        this.leftHour = false;
      }
    }

    if(minutes == '14'){ //Mensaje restante para 15 minutos de prueba
      if(this.leftMinutes){
        this.presentAlertMinutes();
        this.leftMinutes = false;
      }
    }

    //Aquí viene la condición de bloqueo de examen cuando se termina el tiempo de presentación de prueba
    if(this.timer < 0){ 
      this.stopTimer();
      this.presentAlertEnd();
    }
  }
}
