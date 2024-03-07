import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Maintanance } from '../interfaces/Maintanance';

@Injectable({
  providedIn: 'root'
})
export class MaintananceService {

  constructor(private http: HttpClient) { }

  getDetails(page: number, pageSize: number, type: string){
    return this.http.get<any>(`${environment.maintananceUrl}?page=${page}&pageSize=${pageSize}&type=${type}`, {observe: 'response'});
  }

  sendDetails(formData: FormData){
    return this.http.post<any>(`${environment.maintananceUrl}`, formData, {observe: 'response'});
  }

  changeDetails(element: Maintanance) {
    return this.http.put<any>(`${environment.maintananceUrl}`, element, {observe: 'response'});
  }
}
