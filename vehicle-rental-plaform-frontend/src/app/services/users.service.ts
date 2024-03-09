import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUserDetails(page: number, pageSize: number, searchedValue: string,active: string,direction: string){
    const params = new HttpParams().set('page', page.toString()).set('pageSize', pageSize.toString()).set('searchedValue',searchedValue).set('active',active).set('direction',direction);
    return this.http.get<any>(`${environment.usersUrl}`, {params, observe: 'response'});
  }
}
