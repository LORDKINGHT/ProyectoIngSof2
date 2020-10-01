import { Injectable } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Dev {
  id: number,
  user: string,
  pass: string,
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  auth = new BehaviorSubject([]);

  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'login.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
      });
    });
  }

  seedDatabase() {
    this.http.get('../loginAssets/loginData.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
          this.loadUser();
          this.dbReady.next(true);
        })
        .catch(e => console.error(e));
    });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getDevs(): Observable<Dev[]> {
    return this.auth.asObservable();
  }
  getLogin(): Observable<any[]> {
    return this.auth.asObservable();
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Adding Methods

loadUser() {
    return this.database.executeSql('SELECT * FROM developer', []).then(data => {
      let login: Dev[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          login.push({ 
            id: data.rows.item(i).id,
            user: data.rows.item(i).user, 
            pass: data.rows.item(i).pass, 
          });
        }
      }
      this.auth.next(login);
    });
  }

  addUser(user, pass) {
    let data = [user,pass];
    return this.database.executeSql('INSERT INTO developer (user, pass) VALUES (?, ?)', data).then(data => {
      this.loadUser();
    });
  }

  getUser(id): Promise<Dev> {
    return this.database.executeSql('SELECT * FROM developer WHERE id = ?', [id]).then(data => {
      return {
        id: data.rows.item(0).id,
        user: data.rows.item(0).name, 
        pass: data.rows.item(0).name, 
      }
    });
  }

  deleteUser(id) {
    return this.database.executeSql('DELETE FROM developer WHERE id = ?', [id]).then(_ => {
      this.loadUser();
    });
  }

  updateUser(dev: Dev) {
    let data = [dev.user, JSON.stringify(dev.user)];
    return this.database.executeSql(`UPDATE developer SET user = ?, pass = ? WHERE id = ${dev.id}`, data).then(data => {
      this.loadUser();
    })
  }
}