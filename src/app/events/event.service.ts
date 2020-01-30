import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
          this.toastr.success('Votre évènement a été créé avec succès.');
          this.router.navigateByUrl('/events');
        },
        err => {
          this.toastr.error(err.message, 'Error occured');
        }
      );
  }

  createUserEvent(eventId, userId, money) {
    if (isNaN(userId)) {
      this.toastr.error('Vous devez créer un compte pour pouvoir acheter un billet.');
    } else {
      let params = {"eventId": eventId, "userId": userId, "money": money};
      this.http.post(`${this.url}/userEvents`, params)
      .subscribe(
        res => {
          this.toastr.success('Votre achat a été validé.');
        },
        err => {
          this.toastr.error('Vous avez déjà acheté ce billet.');
        }
      );
    }
  }
}