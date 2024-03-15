import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper: JwtHelperService = new JwtHelperService();

  permissions = new BehaviorSubject<string[]>([]);
  role = new BehaviorSubject<string>('');
  profileInfo = new BehaviorSubject<any>({});
  email = new BehaviorSubject<string>('');

  constructor() {
    if (localStorage.getItem('token') != null) {
      this.tokenDecode();
    }
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('isLogin') === 'true') {
      return true;
    }
    else {
      return false;
    }
  }

  tokenDecode() {
    const decodeToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    this.role.next(decodeToken.role[0].authority);
    this.permissions.next(decodeToken.permissions);
    this.profileInfo.next(decodeToken.profileInfo);
    this.email.next(decodeToken.sub);
  }
}
