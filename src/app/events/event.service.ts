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
          this.toastr.success('Votre évènement a été créé avec succès.', 'Success');
          this.router.navigateByUrl('/events');
        },
        err => {
          this.toastr.error(err.message, 'Error occured');
        }
      );
  }

  createUserEvent(data) {
    console.log(data.userId);
    if (isNaN(data.userId)) {
      this.toastr.error('Vous devez créer un compte pour pouvoir acheter un billet.');
    } else {
      this.http.post(`${this.url}/userEvents`, data)
      .subscribe(
        res => {
          this.toastr.success('Votre achat a été validé.', 'Success');
        },
        err => {
          this.toastr.error('Vous avez déjà acheté ce billet.');
        }
      );
    }
  }
}