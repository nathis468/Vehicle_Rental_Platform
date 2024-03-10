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

  localStoring(response){
    localStorage.setItem('isLogin','true');
    localStorage.setItem('token',`${response.body.token}`);
  }
}
