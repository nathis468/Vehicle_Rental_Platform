import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }
  
  login(body : object){
    return this.http.post<any>(`${environment.authenticationUrl}/login`, body, {observe : 'response'});
  }

  // getUserProfile() {
  //   return this.http.get<any>(`${environment.usersUrl}/profile/${localStorage.getItem('email')}`, {observe: 'response'});
  // }

  localStoring(response){
    // localStorage.setItem('permissions',JSON.stringify(response.body.permission));
    localStorage.setItem('isLogin','true');
    localStorage.setItem('token',`${response.body.token}`);
    // localStorage.setItem('email',email);
    // localStorage.setItem('profileInfo',JSON.stringify(response.body.userInfo));

  }
}
