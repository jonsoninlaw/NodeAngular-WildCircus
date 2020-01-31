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
          this.toastr.error('Les informations renseignées sont incorrectes');
        }
      );
  }

  createUserEvent(eventId, userId, eventPrice, money) {
    if (isNaN(userId)) {
      this.toastr.error('Vous devez créer un compte pour pouvoir acheter un billet.');
      return false;
    } else if (money < eventPrice) {
      this.toastr.error("Désolé, vous n'avez pas assez d'argent !");
      return false;
    }
    else {
      let params = {"eventId": eventId, "userId": userId, "money": eventPrice};
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
    return true;
  }

  sellUserEvent(eventId, userId, eventPrice) {
    console.log(eventId);
    let httpParams = new HttpParams().set('eventId', eventId).set("userId", userId).set("money", eventPrice);
    let options = { params: httpParams };
    this.http.delete(`${this.url}/userEvents`, options).subscribe(
      res => {
        this.toastr.success('Le cirque a racheté votre place.');
      },
      err => {
        this.toastr.error('Trop tard !');
      }
    );
  }

  getUserEvents(userId) {
    let params = new HttpParams().set("userId", userId);
    return this
      .http
      .get(`${this.url}/userEvents`, {'params': params});
  }
}