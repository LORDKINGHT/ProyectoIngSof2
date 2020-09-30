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
    const actionSheet = await this.actionSheetController.create({
      header: 'Bancos de preguntas',
      backdropDismiss: false,
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Banco #1',
        icon: 'server-outline',
        handler: () => {
          this._router.navigate(['/test']);
        }
      }, {
        text: 'Banco #2',
        icon: 'server-outline',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Banco #3',
        icon: 'server-outline',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Banco #4',
        icon: 'server-outline',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
