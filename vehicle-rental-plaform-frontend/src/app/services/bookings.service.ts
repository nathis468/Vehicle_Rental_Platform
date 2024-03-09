import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { BookingDetails } from '../interfaces/BookingDetails';
import { Email } from '../interfaces/Email';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor(private http: HttpClient) { }

  getBookingDetails(email: string, page: number, pageSize: number, searchedValue: string,active: string, direction: string) {
    const params = new HttpParams().set('page', page.toString()).set('pageSize', pageSize.toString()).set('searchedValue',searchedValue).set('active',active).set('direction',direction);
    return this.http.get<any>(`${environment.bookingsUrl}/${email}`, {params, observe: 'response'});
  }

  createBooking(data: BookingDetails){
    return this.http.post<any>(environment.bookingsUrl, data, {observe : 'response'});
  }

  provideRating(data: BookingDetails, rating :number) {
    return this.http.put<any>(`${environment.bookingsUrl}?rating=${rating}`, data);
  }

  sendEmail(data: Email, status: string){
    return this.http.post<any>(`${environment.emailUrl}/${status}`, data, {observe: 'response'});  
  }

  cancelBooking(data: BookingDetails){
    return this.http.put<any>(`${environment.bookingsUrl}/cancel`, data, {observe: 'response'});
  }
}
