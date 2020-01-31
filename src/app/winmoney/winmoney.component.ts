import { Component, OnInit, ElementRef } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-winmoney',
  templateUrl: './winmoney.component.html',
  styleUrls: ['./winmoney.component.css']
})
export class WinmoneyComponent implements OnInit {

  constructor(private elementRef:ElementRef, private userService:UserService, private router:Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    var countDown = 20;
    var x = setInterval(function() {
      document.getElementById("countdown").innerHTML = "Veuillez patienter " + countDown + " s";
      if (countDown < 0) {
        clearInterval(x);
        document.getElementById("countdown").hidden = true;
        document.getElementById("moneyButton").hidden = false;
        //document.getElementById("countdown").innerHTML = "<a color='info' href='' (click)='earnMoney($event)' class='btn btn-primary'>Prendre mon argent</a>"
      } else {
        countDown -= 1;
      }
    }, 1000);
  }

  earnMoney($event) {
    $event.preventDefault();
    let userId = parseInt(sessionStorage.getItem("user"));
    let money = parseInt(sessionStorage.getItem("money"));
    this.userService.earnMoney(userId, 100);
    sessionStorage.setItem("money", (money + 100).toString());
    this.router.navigateByUrl('/events');
  }
}
