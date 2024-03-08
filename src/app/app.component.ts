import { Component, OnInit } from '@angular/core';
import { userService } from './homepage/user-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'My-first-app';

  constructor(private userService1:userService,private router:Router) {
  }
  ngOnInit(): void {
   
    if(this.userService1.autoLogOut())
    this.router.navigate(["register"]);
  }


}
