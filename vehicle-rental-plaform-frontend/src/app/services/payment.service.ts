import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { BookingDetails } from '../interfaces/BookingDetails';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http : HttpClient) { }

  createPayment(amount : number) {
    return this.http.get<any>(`${environment.paymentUrl}?amount=${amount}`, {observe : 'response'})
  }
}
