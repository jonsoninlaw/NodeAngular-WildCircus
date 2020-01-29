import { Component, OnInit } from '@angular/core';
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

  constructor(private eventService:EventService, private router:Router) { }

  ngOnInit() {
    this.eventService
      .getEvent()
      .subscribe((data: Event[]) => {
        this.events = data;
      });
  }

  goToAddEvent () {
    this.router.navigateByUrl('/ajout-event');
  }

  showDate(event:Event) {
    let date = new Date(event.date);
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let year = date.getFullYear();
    return day + "/" + month + "/" + year;
  }
}
