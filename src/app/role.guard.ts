import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    const role = this.authService.getUserRole();

    if (role === 'admin'|| role === 'member') {
      return true;
    } else {
      // redirect to access denied or home page
      console.log('Access denied: insufficient permissions');
      
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }

}
