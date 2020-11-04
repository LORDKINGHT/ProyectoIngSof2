import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetQuestionPage } from './set-question.page';



const routes: Routes = [
  {
    path: '',
    component: SetQuestionPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class SetQuestionPageRoutingModule {}
