import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Vehicles } from '../interfaces/Vehicles';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(private http : HttpClient) { }

  getAllVehiclesDetails() {
    return this.http.get<Observable<Vehicles>>(environment.vehiclesUrl, {observe : 'response'});
  }

  getFilteredVehicles(body : any){
    if(body.latitude === ''){
      body.latitude = 'default';
    }
    if(body.longitude === ''){
      body.longitude = 'default';
    }
    
    const vehiclesUrl = `${environment.vehiclesUrl}?latitude=${body.latitude}&longitude=${body.longitude}&startDate=${body.startDate}&endDate=${body.endDate}`;
    return this.http.get<any>(vehiclesUrl, {observe : 'response'});
  }

  getVehicle(vehicleId : string){
    return this.http.get<Vehicles>(`${environment.vehiclesUrl}/${vehicleId}`, {observe : 'response'});
  }

  addVehicle( formData : FormData){
    return this.http.post<any>(`${environment.vehiclesUrl}`, formData, { observe: 'response' });
  }

  updateVehicle(updateVehicle: Vehicles['vehicles']){
    return this.http.put<any>(`${environment.vehiclesUrl}`, updateVehicle, { observe: 'response' });
  }

  removeVehicle(removeVehicle: Vehicles['vehicles']){
    return this.http.delete<any>(`${environment.vehiclesUrl}`, {body : removeVehicle});
  }

  getTotalCarDetails(){
    return this.http.get<any>(`${environment.vehiclesUrl}/getCarsName`, {observe: 'response'});
  }
}
