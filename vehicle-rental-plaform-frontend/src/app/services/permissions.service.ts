import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  permissions = new BehaviorSubject<string[]>([]);

  constructor() { 
    if(localStorage.getItem('permissions') !== null){
      this.permissions.next(JSON.parse(localStorage.getItem('permissions')));
    }
  }

  isAuthenticated() : boolean{
    if(localStorage.getItem('isLogin') === 'true'){
      return true;
    }
    else{
      return false;
    }
  }

  getPermissions(): string[] {
    return this.permissions.getValue();
  }
}
