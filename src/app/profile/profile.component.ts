import { Component, OnInit } from '@angular/core';
import { EventService } from '../events/event.service';
import { UserEvent } from '../events/userEvent.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  events: UserEvent[];

  constructor(private eventService:EventService) { }

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
}
