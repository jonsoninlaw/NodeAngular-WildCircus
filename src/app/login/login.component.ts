import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { User } from '../user/user.interface';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User = {
    id: null,
    nickname: null,
    email: null,
    password: null,
    money: null
  };

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.userService.getUserByEmailAndPassword(this.user.email, this.user.password).subscribe({
      next: (data: any) => {
        console.log("next");
        if (data != null) {
          this.user.id = data.id;
          this.user.nickname = data.nickname;
          this.user.email = data.email;
          this.user.money = data.money;
        }
      },
      error: err => console.log(err),
      complete: () => {
        sessionStorage.setItem("user", this.user.id.toString());
        sessionStorage.setItem("money", this.user.money.toString());
        sessionStorage.setItem("nickname", this.user.nickname.toString());
        if (this.user.email == "admin@admin.com") {
          sessionStorage.setItem("admin", "admin");
        }
        window.location.href = "/events";
      }
    });
  }
}
