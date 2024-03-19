import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Maintanance } from '../interfaces/Maintanance';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaintananceService {

  constructor(private http: HttpClient) { }

  getDetails(page: number, pageSize: number, type: string): Observable<HttpResponse<PageEvent>> {
    return this.http.get<PageEvent>(`${environment.maintananceUrl}?page=${page}&pageSize=${pageSize}&type=${type}`, { observe: 'response' });
  }

  sendDetails(formData: FormData) {
    return this.http.post(`${environment.maintananceUrl}`, formData, { observe: 'response' });
  }

  changeDetails(element: Maintanance) {
    return this.http.put(`${environment.maintananceUrl}`, element, { observe: 'response' });
  }
}
