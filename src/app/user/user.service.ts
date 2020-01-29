import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Injectable()
export class UserService {
  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }
  url = 'http://localhost:3000';

  getUserByEmail(email) {
    let params = new HttpParams().set("email", email);
    return this.http.get(`${this.url}/users`, {'params': params});
  }

  createUser(data) {
    return this.http.post(`${this.url}/users`, data)
      .subscribe(
        res => {
          this.toastr.success('Votre compte a été créé avec succès.', 'Success');
          this.router.navigateByUrl('/');
        },
        err => {
          console.log('Error occured:' , err);
          this.toastr.error(err.message, 'Error occured');
        }
      );
  }
}