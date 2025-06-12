import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'team member | admin' 
  };

  constructor(private router: Router) { }

  registerUser() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if email already exists
    const existingUser = users.find((u: any) => u.email === this.registerData.email);
    if (existingUser) {
      alert('User already exists with this email.');
      return;
    }

    // Save user
    users.push({
      firstName: this.registerData.firstName,
      lastName: this.registerData.lastName,
      email: this.registerData.email,
      password: this.registerData.password,
      role: this.registerData.role
    });

    localStorage.setItem('users', JSON.stringify(users));
    alert('Registered successfully!');

    this.router.navigate(['/login']); // Redirect to login
  }

  ngOnInit(): void {
  }

}
