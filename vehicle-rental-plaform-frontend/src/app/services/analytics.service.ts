import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { SalesOverTime } from '../interfaces/SalesOverTime';
import { TopRatings } from '../interfaces/TopRatings';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private http: HttpClient) { }

  yearlyAnalytics(carModelName: string): Observable<HttpResponse<SalesOverTime[]>> {
    return this.http.get<SalesOverTime[]>(`${environment.analyticsUrl}/yearly?carModelName=${carModelName}`, { observe: 'response' });
  }

  rating(selectedRank: string): Observable<HttpResponse<TopRatings[]>> {
    return this.http.get<TopRatings[]>(`${environment.analyticsUrl}/rating/${selectedRank}`, { observe: 'response' });
  }
}
