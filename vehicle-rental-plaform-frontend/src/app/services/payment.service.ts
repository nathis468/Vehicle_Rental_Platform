import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { BookingDetails } from '../interfaces/BookingDetails';
import { Payment } from '../interfaces/Payment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  createPayment(amount: number): Observable<HttpResponse<Payment>> {
    return this.http.get<Payment>(`${environment.paymentUrl}?amount=${amount}`, { observe: 'response' })
  }
}
