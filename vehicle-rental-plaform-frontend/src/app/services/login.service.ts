import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Token } from '../interfaces/Token';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(body: object): Observable<HttpResponse<Token>> {
    return this.http.post<Token>(`${environment.authenticationUrl}/login`, body, { observe: 'response' });
  }

  localStoring(response: HttpResponse<Token>) {
    localStorage.setItem('isLogin', 'true');
    localStorage.setItem('token', `${response.body.token}`);
  }
}
