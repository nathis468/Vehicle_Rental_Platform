import { Injectable } from '@angular/core';
import { ProfileInfo } from '../interfaces/ProfileInfo';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Users } from '../interfaces/Users';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profileInfo = new BehaviorSubject<ProfileInfo>({ _id: '', userName: '', profilePic: '', contactNumber: '', bio: '', address: '', city: '', state: '', zipcode: '' });

  constructor(private http: HttpClient) { }

  updateProfile(data: FormData): Observable<HttpResponse<Users>>{
    return this.http.put<Users>(`${environment.authenticationUrl}/updateProfile`, data, { observe: 'response' });
  }
}
