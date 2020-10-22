import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QuestionsPage } from '../questions/questions.page';

@Component({
  selector: 'app-review',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
  }

  async openModal(){

    const modal = await this.modalCtrl.create({
      component: QuestionsPage,
      componentProps: {
        pregunta: "this.pregunta"
      }
    });

    await modal.present();
  }

}