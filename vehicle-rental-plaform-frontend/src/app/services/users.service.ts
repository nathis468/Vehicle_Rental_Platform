import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUserDetails(page: number, pageSize: number){
    return this.http.get<any>(`${environment.usersUrl}?page=${page}&pageSize=${pageSize}`, {observe: 'response'});
  }
}
