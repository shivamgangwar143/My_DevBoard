import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }

  logout() {
    // Remove user session
    this.auth.logout();

    // localStorage.removeItem('loggedInUser');

    // Redirect to login
    // this.router.navigate(['/']);
  }

  ngOnInit(): void {
  }

}
