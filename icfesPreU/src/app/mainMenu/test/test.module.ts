import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TestPageRoutingModule } from './test-routing.module';
import { TestPage } from './test.page';
import { QuestionsPage } from '../questions/questions.page';
import { QuestionsPageModule } from '../questions/questions.module';

@NgModule({
  entryComponents: [
    QuestionsPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestPageRoutingModule,
    QuestionsPageModule
  ],
  declarations: [TestPage]
})
export class TestPageModule {}
