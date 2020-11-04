import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {

  constructor(public actionSheetController: ActionSheetController, private router: Router) {}

  ngOnInit() {
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Bancos de preguntas',
      backdropDismiss: false,
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Banco #1',
        icon: 'server-outline',
        handler: () => {
          this.router.navigate(['/test']);
        }
      }, {
        text: 'Banco #2',
        icon: 'server-outline',
        handler: () => {
          this.router.navigate(['/test']);
        }
      }, {
        text: 'Banco #3',
        icon: 'server-outline',
        handler: () => {
          this.router.navigate(['/test']);
        }
      }, {
        text: 'Banco #4',
        icon: 'server-outline',
        handler: () => {
          this.router.navigate(['/test']);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          this.router.navigate(['/test']);
        }
      }]
    });
    await actionSheet.present();
  }
}
