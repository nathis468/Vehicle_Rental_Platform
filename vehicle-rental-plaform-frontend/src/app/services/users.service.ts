import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Users } from '../interfaces/Users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUserDetails(page: number, pageSize: number, searchedValue: string, active: string, direction: string): Observable<HttpResponse<PageEvent>> {
    const params = new HttpParams().set('page', page.toString()).set('pageSize', pageSize.toString()).set('searchedValue', searchedValue).set('active', active).set('direction', direction);
    return this.http.get<PageEvent>(`${environment.usersUrl}`, { params, observe: 'response' });
  }

  getUserProfile(email: string): Observable<HttpResponse<Users>>{
    return this.http.get<Users>(`${environment.usersUrl}/profile/${email}`, {observe: 'response'});
  }
}
