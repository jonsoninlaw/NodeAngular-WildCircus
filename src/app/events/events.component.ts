import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EventService } from './event.service';
import { Router } from '@angular/router';
import { Event } from './events.interface';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events:Event[];

  admin:boolean = sessionStorage.getItem("admin") != null ? true : false;

  constructor(private eventService:EventService, private router:Router) { }

  @Output('activate')
  activateEvents: EventEmitter<any>;

  ngOnInit() {
    this.eventService
      .getEvent()
      .subscribe((data: Event[]) => {
        this.events = data;
      });
  }

  goToAddEvent (event: Event) {
    this.router.navigateByUrl('/ajout-event');
  }

  addUserEvent ($event, eventId: Number, eventPrice: number) {
    $event.preventDefault();
    let userId = parseInt(sessionStorage.getItem("user"));
    let money = parseInt(sessionStorage.getItem("money"));
    if (this.eventService.createUserEvent(eventId, userId, eventPrice, money)) {
      sessionStorage.setItem("money", (money - eventPrice).toString());
      if (this.router.url == '/events') {
        this.router.navigateByUrl('/events_');
      } else {
        this.router.navigateByUrl('/events');
      }
    }
  }

  showDate(event:Event) {
    let date = new Date(event.date);
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let year = date.getFullYear();
    return day + "/" + month + "/" + year;
  }
}
