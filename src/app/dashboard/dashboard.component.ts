import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, timeout } from 'rxjs/operators';
import { User } from '../user/user.interface';
import { UserService } from '../user/user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  user:User = {
    id: null,
    nickname: null,
    email: null,
    password: null,
    money: null
  }

  online:boolean = sessionStorage.getItem("user") != null ? true : false;
  money:number = sessionStorage.getItem("money") != null ? parseInt(sessionStorage.getItem("money")) : null;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private userService: UserService, private breakpointObserver: BreakpointObserver, private router:Router) {
  }

  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('/');
  }

  ngOnInit() {
    if (sessionStorage.getItem("user") != null) {
      let result:User;
      this.userService.getUserByEmail(sessionStorage.getItem("userEmail")).subscribe((data: User) => {
        this.user = data;
      });
    }
  }
}