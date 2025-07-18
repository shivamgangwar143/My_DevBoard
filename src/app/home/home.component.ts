import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  navigateTo(path: string) {
    if (path === 'signin') {
      this.router.navigate([`/login`]);
    } else if (path === 'signup') {
      this.router.navigate([`/register`]);
    }
  }

}
