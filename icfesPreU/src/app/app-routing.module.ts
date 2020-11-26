import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./mainMenu/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'review',
    loadChildren: () => import('./mainMenu/review/review.module').then(m => m.ReviewPageModule)
  },
  {
    path: 'simulacrum',
    loadChildren: () => import('./mainMenu/simulacrum/simulacrum.module').then(m => m.SimulacrumPageModule)
  },
  {
    path: 'test/:id',
    loadChildren: () => import('./mainMenu/test/test.module').then(m => m.TestPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationPageModule)
  },
  {
    path: 'study',
    loadChildren: () => import('./mainMenu/study/study.module').then(m => m.StudyPageModule)
  },
  {
    path: 'information',
    loadChildren: () => import('./mainMenu/information/information.module').then(m => m.InformationPageModule)
  },
  {
    path: 'set-question',
    loadChildren: () => import('./admin/set-question/set-question.module').then(m => m.SetQuestionPageModule)
  },
  {
    path: 'edit-question',
    loadChildren: () => import('./admin/edit-question/edit-question.module').then(m => m.EditQuestionPageModule)
  },
  {
    path: 'score',
    loadChildren: () => import('./mainMenu/score/score.module').then( m => m.ScorePageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
