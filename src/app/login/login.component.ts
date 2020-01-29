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
    password: null
  };

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.userService.getUserByEmailAndPassword(this.user.email, this.user.password).subscribe({
      next: (data: any) => {
        if (data != null) {
          this.user.id = data.ID;
          this.user.nickname = data.nickname;
        }
      },
      error: err => console.log(err),
      complete: () => {
        sessionStorage.setItem("user", this.user.id.toString());
        window.location.href = "/";
      }
        });
  }
}
