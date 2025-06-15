import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient as HtttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private api = "http://localhost:3000";

  constructor(private http: HtttpClient, private router: Router) {}
  login(credentials: { email: string; password: string }) {
    return this.http.post(`${this.api}/login`, credentials).subscribe({
      next: (res: any) => {
        localStorage.setItem("accessToken", res.token);
        localStorage.setItem("refreshToken", JSON.stringify(res.refreshToken));
        this.router.navigate(["/dashboard"]);
      },
      error: (err: any) => {
        console.error("Login failed:", err);
        alert(err.error.message || "Login failed.");
      },
    });
  }

  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    this.router.navigate(["/home"]);
  }
  getAccessToken() {
    return localStorage.getItem("accessToken");
  }
  getrefreshToken() {
    return localStorage.getItem("refreshToken");
  }
  refreshToken() {
    const refreshToken = this.getrefreshToken();
    return this.http.post(`${this.api}/refresh`, { refreshToken });
  }
  decodeToken(token: string): any {
    return JSON.parse(atob(token.split(".")[1]));
  }

  getUserRole(): string | null {
    const token = this.getAccessToken();
    if (!token) return null;
    return this.decodeToken(token).role;
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }
  getUserEmail(): string | null {
    const token = this.getAccessToken();
    if (!token) return null;
    return this.decodeToken(token).email;
  }
  // getUserName(): string | null {
  //   const token = this.getAccessToken();
  //   if (!token) return null;
  //   return this.decodeToken(token).name;
  // }
}

