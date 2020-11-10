import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QuestionsPage } from '../questions/questions.page';
import { QuestionsService } from './services/questions.service';
import { Platform } from '@ionic/angular';
import { AngularFireObject } from '@angular/fire/database';
import { question } from '../../shared/question.class';
import { ActivatedRoute } from '@angular/router';

// Infinite Scroll
import { IonInfiniteScroll } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

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
  itemRef: AngularFireObject<any>;
  listQuestions: Array<question> = [];
  arguments = null;
  map = new Map<string, string>();

  constructor(private modalCtrl: ModalController, public questionsService: QuestionsService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.startTimer(30);

    this.arguments = this.route.snapshot.paramMap.get('id');
    console.log(this.arguments);

    this.itemRef = this.questionsService.getQuestions(this.arguments);
    this.requestQuestions();
  }

  ngAfterViewInit(): void {
  }

  requestQuestions() {
    this.itemRef.snapshotChanges().subscribe(actions => {

      let key = 1;
      let value = 1;

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

          this.map.set('' + key, 'Enunciado ' + questions.inicioRangoEnunciado + ' - ' + questions.finRangoEnunciado);
          key++;

          this.listQuestions = this.listQuestions.concat([questions]);

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
        this.map.set('' + key, '' + value);
        key++;
        value++;
      }

      this.totalNumQuestions = this.map.size;
      this.creatingSection(this.listQuestions, this.numQuestion - 1);

      console.log(this.listQuestions);
      console.log(this.totalNumQuestions);
      console.log(this.map.get('1'));

      for (let i = 0; i < this.totalNumQuestions; i++) {
        this.listMarkQuestions = this.listMarkQuestions.concat([0]);
        this.listAnswerQuestions = this.listAnswerQuestions.concat(['null']);
      }

    });
  }

  creatingSection(list: Array<question>, num: number) {
    const quest = list[num];
    const enunciado2: HTMLElement = document.getElementById('enunciado2');
    const section4: HTMLElement = document.getElementById('section4');
    const listAns: HTMLElement = document.getElementById('listAns');
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
    this.removeHTML();
    this.creatingSection(this.listQuestions, this.numQuestion - 1);
    this.checkMarkedQuestion();
  }

  nextQuestion() {
    if (this.numQuestion < this.totalNumQuestions) {
      this.numQuestion++;
    }
    this.removeHTML();
    this.creatingSection(this.listQuestions, this.numQuestion - 1);
    console.log(this.listAnswerQuestions);
    this.checkMarkedQuestion();
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

  updateTimeValue(){
    let hours: any = this.timer / 3600;
    let minutes: any = this.timer / 60;
    let seconds: any = this.timer % 60;

    hours = String('0' + Math.floor(hours)).slice(-2);
    minutes = String('0' + Math.floor(minutes)).slice(-2);
    seconds = String('0' + Math.floor(seconds)).slice(-2);

    const text = hours + ':' + minutes + ':' + seconds;
    this.time.next(text);

    --this.timer;

    //Aquí viene la condición de bloqueo de examen cuando se termina el tiempo de presentación de prueba
    if(this.timer < 0){ 
      this.startTimer(0);
    }
  }
}
