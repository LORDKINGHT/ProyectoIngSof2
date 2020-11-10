import {
  Component,
  OnInit,
  Input,
  Renderer2,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit, AfterViewInit {
  @Input() numQuestion;
  @Input() map;
  @Input() listMarkQuestions;

  constructor(
    private modalCtrl: ModalController,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) { }

  ngAfterViewInit(): void {
    for (let i = 1, j = 2; j <= this.map.size || i <= this.map.size; i = i + 2, j = j + 2) {

      if (this.map.size % 2 !== 0 && i === this.map.size) {
        this.creatingSectionNumberOdd(i);
      } else {
        this.creatingSectionNumberPair(i, j);
      }

      const elem1: HTMLElement = document.getElementById('ques' + i.toString());
      elem1.addEventListener(
        'click',
        this.closeModalNewQuestion.bind(this, i),
        false
      );
      if (i !== this.map.size) {
        const elem2: HTMLElement = document.getElementById('ques' + j.toString());
        elem2.addEventListener(
          'click',
          this.closeModalNewQuestion.bind(this, j),
          false
        );
      }
      console.log();

    }

    const parent: HTMLCollection = document.getElementsByClassName('question');
    for (let i = 0; i < parent.length; i++) {
      // tslint:disable-next-line: triple-equals
      if (parent.item(i).getAttribute('value') == this.numQuestion) {
        parent.item(i).setAttribute('color', 'primary');
      }
      if (this.listMarkQuestions[i] === 1) {
        parent
          .item(i)
          .insertAdjacentHTML(
            'beforeend',
            '<ion-icon slot="end" name="bookmark"></ion-icon>'
          );
      }
    }
  }

  creatingSectionNumberPair(i: number, j: number) {
    const container: HTMLElement = document.getElementById('container');
    // tslint:disable-next-line: max-line-length
    container.insertAdjacentHTML(
      'beforeend',
      '<ion-row><ion-col><ion-button id="ques' +
      i.toString() +
      '" class="question" expand="block" color="medium" value="' +
      i.toString() +
      '">' +
      this.map.get(i.toString()) +
      '</ion-button></ion-col><ion-col><ion-button id="ques' +
      j.toString() +
      '" class="question" expand="block" color="medium" value="' +
      j.toString() +
      '" (click)="closeModalNewQuestion(' +
      j.toString() +
      ')">' +
      this.map.get(j.toString()) +
      '</ion-button></ion-col></ion-row>'
    );
  }

  creatingSectionNumberOdd(i: number) {
    const container: HTMLElement = document.getElementById('container');
    // tslint:disable-next-line: max-line-length
    container.insertAdjacentHTML(
      'beforeend',
      '<ion-row><ion-col><ion-button id="ques' +
      i.toString() +
      '" class="question" expand="block" color="medium" value="' +
      i.toString() +
      '">' +
      this.map.get(i.toString()) +
      '</ion-button></ion-col><ion-col><ion-button id="ques" class="question" expand="block" color="medium" disabled="true"></ion-button></ion-col></ion-row>'
    );
  }

  ngOnInit() {
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  closeModalNewQuestion(newQuestion) {
    this.modalCtrl.dismiss({
      numNewQuestion: newQuestion,
    });
  }
}
