import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private http: HttpClient) { }

  yearlyAnalytics(carModelName: string){
    return this.http.get<any>(`${environment.analyticsUrl}/yearly?carModelName=${carModelName}`, {observe: 'response'});
  }

  topRating(selectedRank: string) {
    console.log(selectedRank);
    
    return this.http.get<any>(`${environment.analyticsUrl}/rating/${selectedRank}`, {observe: 'response'});
  }
}
