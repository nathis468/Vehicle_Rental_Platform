import { Injectable } from "@angular/core";
import { Router , RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate} from "@angular/router";
import { LoginService } from "./services/login.service";
import { PermissionsService } from "./services/permissions.service";



@Injectable({
    providedIn : 'root'
})

export class AuthGuard implements CanActivate{
    constructor(private loginService: LoginService, private router: Router, private permissionsService : PermissionsService){ }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean{
        if(this.permissionsService.isAuthenticated()){
            return true;
        }
        else{
            return false;
        }
    }   
}
