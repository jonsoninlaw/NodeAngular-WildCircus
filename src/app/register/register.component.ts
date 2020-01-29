import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { User } from '../user/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user:User = {
    id: null,
    nickname: null,
    email: null,
    password: null
  };

  constructor(private userService:UserService) { }

  ngOnInit() {
  }

  createUser() {
    this.userService.createUser(this.user);
  }
}
