import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(body: object) {
    return this.http.post(`${environment.authenticationUrl}/register`, body, { observe: 'response' });
  }
}
