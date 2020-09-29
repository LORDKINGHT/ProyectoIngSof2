import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimulacrumPage } from './simulacrum.page';

const routes: Routes = [
  {
    path: '',
    component: SimulacrumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimulacrumPageRoutingModule {}
