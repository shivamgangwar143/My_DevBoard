import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  registerData = {
    fullName: "",
    //lastName: '',
    email: "",
    password: "",
    confirmPassword: "",
    role: "team member | admin",
  };

  constructor(private router: Router, private http:HttpClient) {}

  registerUser() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Check if email already exists
    const existingUser = users.find(
      (u: any) => u.email === this.registerData.email
    );
    if (existingUser) {
      alert("User already exists with this email.");
      return;
    }
    this.http.post("http://localhost:3000/register", this.registerData).subscribe({next: () => {
          alert("Registered successfully!");
          this.router.navigate(["/login"]);
        },
        error: (err) => {
          console.error(err);
          alert(err.error.message || "Registration failed.");
        },
      });

    // Save user
    // users.push({
    //   firstName: this.registerData.fullName,
    //   //lastName: this.registerData.lastName,
    //   email: this.registerData.email,
    //   password: this.registerData.password,
    //   role: this.registerData.role
    // });

    // localStorage.setItem('users', JSON.stringify(users));
    // alert('Registered successfully!');

    this.router.navigate(["/login"]); // Redirect to login
  }

  ngOnInit(): void {}
}
