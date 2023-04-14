import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = 'login';
  isMenuRequired = false;


  constructor(private router: Router) {

  }

  ngDoCheck(): void {
    let currentRouterUrl = this.router.url
    if(currentRouterUrl == '/login' || currentRouterUrl == '/register') {
      this.isMenuRequired = false;
    } else {
      this.isMenuRequired = true;
    }
  }
}
