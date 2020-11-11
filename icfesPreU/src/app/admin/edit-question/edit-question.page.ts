import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.page.html',
  styleUrls: ['./edit-question.page.scss'],
})
export class EditQuestionPage implements OnInit {

  constructor() { }

  public showDB: boolean;

  public selectPregunta: string;
  ngOnInit() {
  }
  async insertarDB(){
  }
  async changeShowDB(){
  }
}
