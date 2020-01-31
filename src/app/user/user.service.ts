import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Injectable()
export class UserService {
  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }
  url = 'http://localhost:3000';

  getUserByEmailAndPassword(email, password) {
    let params = new HttpParams().set("email", email).set("password", password);
    return this.http.get(`${this.url}/users`, {'params': params});
  }

  createUser(data) {
    return this.http.post(`${this.url}/users`, data)
      .subscribe(
        res => {
          this.toastr.success('Votre compte a bien été créé.');
          this.router.navigateByUrl('/');
        },
        err => {
          console.log('Error occured:' , err);
          this.toastr.error(err.message, 'Error occured');
        }
      );
  }

  earnMoney(userId, money) {
    let params = {"userId": userId, "money": money};
    this.http.post(`${this.url}/earnMoney`, params)
    .subscribe(
      res => {
        this.toastr.success('Félicitations, vous avez gagné 100 € sans rien faire !');
      },
      err => {
        this.toastr.error('Désolé mais non.');
      }
    );
  }
}