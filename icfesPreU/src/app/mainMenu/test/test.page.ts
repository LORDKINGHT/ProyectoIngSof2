import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QuestionsPage } from '../questions/questions.page';

// Infinite Scroll
import { IonInfiniteScroll } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-review',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.startTimer(30);
  }

  async openModal(){

    const modal = await this.modalCtrl.create({
      component: QuestionsPage,
      componentProps: {
        pregunta: 'this.pregunta'
      }
    });

    await modal.present();
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
