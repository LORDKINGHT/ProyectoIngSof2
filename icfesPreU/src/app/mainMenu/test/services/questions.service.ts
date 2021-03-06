import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { user } from '../../../shared/user.class';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  items: AngularFireList<unknown>;
  itemRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  getQuestions(id, subject) {
    this.itemRef = this.db.object('simulacro/db_' + id + '/' + subject + '/');
    return this.itemRef;
  }
}
