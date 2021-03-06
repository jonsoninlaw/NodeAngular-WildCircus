import { Component, OnInit } from '@angular/core';
import { EventService } from '../events/event.service';
import { Event } from '../events/events.interface';

@Component({
  selector: 'app-ajout-event',
  templateUrl: './ajout-event.component.html',
  styleUrls: ['./ajout-event.component.css']
})
export class AjoutEventComponent implements OnInit {

  event: Event = {
    id: null,
    name: '',
    price: null,
    date: null,
    capacity: null,
    img: null,

    showDate() {
      let date = new Date(this.date);
      let day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
      let month = date.getMonth() >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
      let year = date.getFullYear();
      return day + "/" + month + "/" + year;
    }
  }

  constructor(private eventService: EventService) { }

  ngOnInit() {
  }

  createEvent() {
    if (this.event.img == null) {
      this.event.img = "https://cdn.dribbble.com/users/1090020/screenshots/6575551/1-01.png"
    }
    this.eventService.createEvent(this.event);
  }
}