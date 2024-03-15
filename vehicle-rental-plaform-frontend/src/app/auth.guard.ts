import { Injectable } from "@angular/core";
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate } from "@angular/router";
import { LoginService } from "./services/login.service";
import { AuthService } from "./services/auth.service";


@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(private loginService: LoginService, private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.isAuthenticated()) {
            return true;
        }
        else {
            return false;
        }
    }
}
