import { Component, OnInit } from '@angular/core';
import { EventService } from './event.service';
import { UserEvent } from './userEvent.interface';
import { Router } from '@angular/router';
import { Event } from './events.interface';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events:Event[];

  constructor(private eventService:EventService, private router:Router) { }

  ngOnInit() {
    this.eventService
      .getEvent()
      .subscribe((data: Event[]) => {
        this.events = data;
      });
  }

  goToAddEvent (event: Event) {
    this.eventService.createEvent(event);
    this.router.navigateByUrl('/ajout-event');
  }

  addUserEvent ($event, eventId: Number, eventPrice: number) {
    $event.preventDefault();
    let userId = parseInt(sessionStorage.getItem("user"));
    let money = parseInt(sessionStorage.getItem("money")) - eventPrice;
    sessionStorage.setItem("money", money.toString());
    this.eventService.createUserEvent(eventId, userId, eventPrice);
  }

  showDate(event:Event) {
    let date = new Date(event.date);
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let year = date.getFullYear();
    return day + "/" + month + "/" + year;
  }
}
