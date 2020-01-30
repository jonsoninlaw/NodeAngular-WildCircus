import { Component, OnInit } from '@angular/core';
import { EventService } from '../events/event.service';
import { UserEvent } from '../events/userEvent.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  events: UserEvent[];

  constructor(private eventService:EventService, private router:Router) { }

  ngOnInit() {
    this.eventService
    .getUserEvents(parseInt(sessionStorage.getItem("user")))
    .subscribe((data: UserEvent[]) => {
      this.events = data;
    });
  }

  showDate(event:UserEvent) {
    let date = new Date(event.date);
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let year = date.getFullYear();
    return day + "/" + month + "/" + year;
  }

  sellUserEvent ($event, eventId: Number, eventPrice: number) {
    $event.preventDefault();
    let userId = parseInt(sessionStorage.getItem("user"));
    let money = parseInt(sessionStorage.getItem("money"));
    this.eventService.sellUserEvent(eventId, userId, eventPrice)
    sessionStorage.setItem("money", (money + eventPrice).toString());
    if (this.router.url == '/profile') {
      this.router.navigateByUrl('/profile_');
    } else {
      this.router.navigateByUrl('/profile');
    }
  }
}
