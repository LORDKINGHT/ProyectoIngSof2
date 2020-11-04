import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SimulacrumPageRoutingModule } from './simulacrum-routing.module';

import { SimulacrumPage } from './simulacrum.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SimulacrumPageRoutingModule
  ],
  declarations: [SimulacrumPage]
})
export class SimulacrumPageModule {}
