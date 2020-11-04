import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetQuestionPageRoutingModule } from './set-question-routing.module';

import { SetQuestionPage } from './set-question.page';

import { ReactiveFormsModule} from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetQuestionPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SetQuestionPage]
})
export class SetQuestionPageModule {}
