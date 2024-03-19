import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Vehicles } from '../interfaces/Vehicles';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(private http: HttpClient) { }

  getAllVehiclesDetails() {
    return this.http.get<Observable<Vehicles>>(environment.vehiclesUrl, { observe: 'response' });
  }

  getFilteredVehicles(body: any, currentPage: number): Observable<HttpResponse<Vehicles[]>> {
    const vehiclesUrl = `${environment.vehiclesUrl}?latitude=${body.latitude}&longitude=${body.longitude}&startDate=${body.startDate}&endDate=${body.endDate}&currentPage=${currentPage}`;
    return this.http.get<Vehicles[]>(vehiclesUrl, { observe: 'response' });
  }

  getVehicle(vehicleId: string): Observable<HttpResponse<Vehicles>> {
    return this.http.get<Vehicles>(`${environment.vehiclesUrl}/${vehicleId}`, { observe: 'response' });
  }

  addVehicle(addVehicle: FormData): Observable<HttpResponse<Vehicles['vehicles']>> {
    return this.http.post<Vehicles['vehicles']>(`${environment.vehiclesUrl}`, addVehicle, { observe: 'response' });
  }

  updateVehicle(updateVehicle: FormData) {
    return this.http.put(`${environment.vehiclesUrl}`, updateVehicle);
  }

  removeVehicle(removeVehicle: Vehicles['vehicles']) {
    return this.http.delete<boolean>(`${environment.vehiclesUrl}`, { body: removeVehicle });
  }

  getTotalCarDetails(): Observable<HttpResponse<Array<string>>> {
    return this.http.get<Array<string>>(`${environment.vehiclesUrl}/getCarsName`, { observe: 'response' });
  }
}
