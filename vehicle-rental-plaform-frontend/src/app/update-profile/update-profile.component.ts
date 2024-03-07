import { Component } from '@angular/core';
import { ProfileService } from '../services/ProfileService';
import { ProfileInfo } from '../interfaces/ProfileInfo';
import { BehaviorSubject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent {

  constructor(private profileService:ProfileService) {}

  profileData : ProfileInfo;

  profile : FormGroup;

  ngOnInit() {
    this.profileService.profileInfo.subscribe({
      next: (data) => {
        this.profileData = data;
        console.log(data);
        
        console.log(this.profileData);  
      },
      complete: () => {
        
        console.log(this.profileData.userName);
      }
    })
    this.profile = new FormGroup({
      userName : new FormControl<string>(this.profileData.userName,Validators.required),
      contactNumber : new FormControl<string>(this.profileData.contactNumber,Validators.required),
      bio : new FormControl<string>(this.profileData.bio),
    })
  }


  
  profilePic : File;
  
  onFileUpload(event : any){
    this.profilePic = (event.target as HTMLInputElement).files[0];

    if (this.profilePic) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileData.profilePic = e.target?.result;
      };
      reader.readAsDataURL(this.profilePic);
    }
    
    console.log(event);
  }
  
  
  onSubmit() {    
    this.profileData.userName = this.profile.value.userName;
    this.profileData.contactNumber = this.profile.value.contactNumber;
    this.profileData.bio = this.profile.value.bio;
    
    
    const updateProfile = new FormData();
    console.log(this.profileData._id);
    
    updateProfile.append('id',this.profileData._id);
    updateProfile.append('userName',this.profileData.userName);
    updateProfile.append('contactNumber',this.profileData.contactNumber);
    updateProfile.append('bio',this.profileData.bio);
    updateProfile.append('file',this.profilePic);

    console.log(updateProfile);
    

    if(this.profile.valid){
      this.profileService.updateProfile(updateProfile).subscribe({
        next: () => {

        }
      })
    }
  }
}
