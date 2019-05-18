import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(){
  	let userAuthenticated = this.authService.isAuthenticated();
  	if (userAuthenticated) {
  		return true;
  	}
  	this.router.navigate(['/login']);
  }
}
