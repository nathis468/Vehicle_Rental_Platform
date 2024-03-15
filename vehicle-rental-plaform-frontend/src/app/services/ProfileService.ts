import { Injectable } from '@angular/core';
import { ProfileInfo } from '../interfaces/ProfileInfo';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profileInfo = new BehaviorSubject<ProfileInfo>({ _id: '', userName: '', profilePic: '', contactNumber: '', bio: '', address: '', city: '', state: '', zipcode: '' });

  constructor(private http: HttpClient) { }

  updateProfile(data: FormData) {
    return this.http.put<any>(`${environment.authenticationUrl}/updateProfile`, data, { observe: 'response' });
  }
}
