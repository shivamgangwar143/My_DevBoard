import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient as HtttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = 'http://localhost:3000/login'

  constructor(private http: HtttpClient, private router: Router) { }
  login(credentials: { email: string; password: string; role: string }) {
    return this.http.post(`${this.api}/login`, credentials).subscribe((res: any) => {
      localStorage.setItem('accessToken', res.token);
      localStorage.setItem('refreshToken', JSON.stringify(res.refreshToken));
      this.router.navigate(['/dashboard']);
    });
  
  }
  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/home']);
  }
  getAccessToken() {
    return localStorage.getItem('accessToken');
  }
  getrefreshToken() {
    return localStorage.getItem('refreshToken');
  }
  refreshToken() {
    const refreshToken = this.getrefreshToken();
    return this.http.post('$(this.api)/refresh', { refreshToken });
  }
  decodeToken(token: string): any {
    return JSON.parse(atob(token.split('.')[1]));
  }

  getUserRole(): string | null {
    const token = this.getAccessToken();
    if (!token) return null;
    return this.decodeToken(token).role;
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }
}

