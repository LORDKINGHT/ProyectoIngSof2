import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { user } from '../../../shared/user.class';

@Injectable({
    providedIn: 'root'
})
export class ScoreService {

    items: AngularFireList<unknown>;
    itemRef: AngularFireObject<any>;

    constructor(private db: AngularFireDatabase) { }

    getScore() {
        this.itemRef = this.db.object('puntaje/');
        return this.itemRef;
    }
}
