import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteQuestionPageRoutingModule } from './delete-question-routing.module';

import { DeleteQuestionPage } from './delete-question.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeleteQuestionPageRoutingModule
  ],
  declarations: [DeleteQuestionPage]
})
export class DeleteQuestionPageModule {}
