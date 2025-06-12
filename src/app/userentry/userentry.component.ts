import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-userentry',
  templateUrl: './userentry.component.html',
  styleUrls: ['./userentry.component.css']
})
export class UserentryComponent {

  loginData = {
    email: '',
    password: '',
    role: 'member'
  };

  constructor(private router: Router, private auth:AuthService) { }


  login() {
    this.auth.login(this.loginData)
    // const users = JSON.parse(localStorage.getItem('users') || '[]');

    // const user = users.find((u: any) =>
    //   u.email === this.loginData.email && u.password === this.loginData.password
    // );

    // if (user) {
    //   // Save logged-in user info (optional)
    //   const users = JSON.parse(localStorage.getItem('users') || '[]');

    //   const user = users.find(
    //     (u: any) =>
    //       u.email === this.loginData.email &&
    //       u.password === this.loginData.password
    //   );
    
    // if (this.loginData.role === 'admin') {
    //   this.router.navigate(['/dashboard']);
    // }

    //   if (user) {
    //     localStorage.setItem('currentUser', JSON.stringify(user));
    //     this.router.navigate(['/profile']);
    //   } else {
    //     alert('Invalid email or password.');
    //   }    
  }

  ngOnInit(): void {
  }

}
