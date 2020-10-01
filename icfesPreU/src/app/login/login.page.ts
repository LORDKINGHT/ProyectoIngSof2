import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService, Dev } from './loginServices/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private router:Router
  developers: Dev[] = [];
  login = {};

  selectedView = 'devs';
  constructor(private db: LoginService) {
  }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.db.getDevs().subscribe(devs => {
          this.developers = devs;
        })
        this.login = this.db.getLogin();
      }
    });
  }

  addLogin() {
    let skills = this.login['skills'].split(',');
    skills = skills.map(skill => skill.trim());

    this.db.addUser(this.login['user'],this.login['pass'])
    .then(_ => {
      this.login = {};
    });
  }
}
