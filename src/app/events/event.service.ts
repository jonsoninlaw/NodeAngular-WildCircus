import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Injectable()
export class EventService {
  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }
  url = 'http://localhost:3000';
  getEvent() {
    return this
      .http
      .get(`${this.url}/events`);
  }

  createEvent(data) {
    this.http.post(`${this.url}/events`, data)
      .subscribe(
        res => {
          console.log(res);
          this.toastr.success('Votre évènement a été créé avec succès.', 'Success');
          this.router.navigateByUrl('/events');
        },
        err => {
          console.log('Error occured:' , err);
          this.toastr.error(err.message, 'Error occured');
        }
      );
  }
}