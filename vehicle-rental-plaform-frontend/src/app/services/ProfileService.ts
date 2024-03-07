import { Injectable } from '@angular/core';
import { ProfileInfo } from '../interfaces/ProfileInfo';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {
    if (localStorage.getItem('permissions') !== null) {
      this.profileInfo.next(JSON.parse(localStorage.getItem('userInfo')));
    }
  }

  profileInfo = new BehaviorSubject<ProfileInfo>({ _id: '', userName: '', profilePic: '', contactNumber: '', bio: '' });

  updateProfile(data: FormData) {
    data.forEach((key,value)=>{
      console.log(key,value);
      

    })
    return this.http.put<any>(`${environment.authenticationUrl}/updateProfile`, data, {observe: 'response'});
  }
}
