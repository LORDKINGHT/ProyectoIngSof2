import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from "@angular/router";

@Component({
  selector: 'app-simulacrum',
  templateUrl: './simulacrum.page.html',
  styleUrls: ['./simulacrum.page.scss'],
})
export class SimulacrumPage implements OnInit {

  constructor(public actionSheetController: ActionSheetController, private _router: Router) { }

  ngOnInit() {
  }

  async presentActionSheet() {
    const id = 0;
    const actionSheet = await this.actionSheetController.create({
      header: 'Bancos de preguntas',
      backdropDismiss: false,
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Banco #1',
        icon: 'server-outline',
        handler: () => {
          this._router.navigate(['/test', 1]);
        }
      }, {
        text: 'Banco #2',
        icon: 'server-outline',
        handler: () => {
          this._router.navigate(['/test', 2]);
        }
      }, {
        text: 'Banco #3',
        icon: 'server-outline',
        handler: () => {
          this._router.navigate(['/test', 3]);
        }
      }, {
        text: 'Banco #4',
        icon: 'server-outline',
        handler: () => {
          this._router.navigate(['/test', 4]);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          this._router.navigate(['/test', 5]);
        }
      }]
    });
    await actionSheet.present();
  }
}
