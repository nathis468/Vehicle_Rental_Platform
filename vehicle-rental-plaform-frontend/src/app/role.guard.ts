import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const requiredRole = route.data['role'] as string[];

    if (this.roleVerify(requiredRole)) {
      return true;
    }
    return false;
  }

  accessRole: string = '';

  roleVerify(requiredRole: string[]): boolean {

    this.authService.role.subscribe({
      next: (data) => {
        this.accessRole = data;
      }
    })

    if (this.accessRole !== '' && requiredRole.includes(this.accessRole)) {
      return true;
    }
    return false;
  }
}
