import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "./loginServices/login.service";
import { user } from "../shared/user.class";
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  user: user = new user();

  constructor(private router: Router, private authSvc: LoginService) {}
  ngOnInit(): void {}
  async onLogin() {
    const user = await this.authSvc.onLogin(this.user);
    if (user) {
      console.log("Succesfull");
      this.router.navigateByUrl("/home");
    }
  }
}