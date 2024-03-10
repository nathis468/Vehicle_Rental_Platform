import { Component } from '@angular/core';
import { ProfileService } from '../services/ProfileService';
import { ProfileInfo } from '../interfaces/ProfileInfo';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent {

  constructor(private authService:AuthService, private profileService: ProfileService, private usersService: UsersService, private route: Router) {}

  userProfileSubscription: Subscription;
  updateProfileSubscription: Subscription;

  profileData : ProfileInfo = {
    _id: '',
    userName : '',
    profilePic: '',
    contactNumber: '',
    bio: '',
    address: '',
    city: '',
    state: '',
    zipcode: ''
  };

  profile : FormGroup;

  ngOnInit() {
    this.authService.email.subscribe({
      next: (email) => {
        this.userProfileSubscription = this.usersService.getUserProfile(email).subscribe({
          next: (data) => {    
            this.profileData = data;
            this.profile.patchValue({
              userName: this.profileData.userName,
              contactNumber: this.profileData.contactNumber,
              bio: this.profileData.bio,
              address: this.profileData.address,
              city: this.profileData.city,
              state: this.profileData.state,
              zipCode: this.profileData.zipcode,
            });
          }
        });
      },
    })
    this.profile = new FormGroup({
      userName : new FormControl<string>('',Validators.required),
      contactNumber : new FormControl<string>('',Validators.required),
      bio : new FormControl<string>(''),
      address: new FormControl<string>(''),
      city: new FormControl<string>(''),
      state: new FormControl<string>(''),
      zipCode: new FormControl<string>('', Validators.pattern(/^\d{5}$/)),
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
  }
  
  
  onSubmit() {    
    this.profileData.userName = this.profile.value.userName;
    this.profileData.contactNumber = this.profile.value.contactNumber;
    this.profileData.bio = this.profile.value.bio;
    this.profileData.address = this.profile.value.address;
    this.profileData.city = this.profile.value.city;
    this.profileData.state = this.profile.value.state;
    this.profileData.zipcode = this.profile.value.zipcode;
    
    
    const updateProfile = new FormData();
    updateProfile.append('id',this.profileData._id);
    updateProfile.append('userName',this.profileData.userName);
    updateProfile.append('contactNumber',this.profileData.contactNumber);
    updateProfile.append('bio',this.profileData.bio);
    updateProfile.append('address',this.profileData.address);
    updateProfile.append('city',this.profileData.city);
    updateProfile.append('state',this.profileData.state);
    updateProfile.append('zipcode',this.profileData.zipcode);

    if (this.profilePic) {
      updateProfile.append('file', this.profilePic);
    } 
    else {
      const defaultFile = new File([], 'default-image.txt', { type: 'text/plain' });
      updateProfile.append('file', defaultFile);
    }
    
    updateProfile.append('file',this.profilePic);

    if(this.profile.valid){
      this.updateProfileSubscription = this.profileService.updateProfile(updateProfile).subscribe({
        next: (response) => {
          this.authService.profileInfo.next(response.body);
        },
        complete: () => {
          Swal.fire("Profile updated Successfully");
          this.route.navigate(['home']);
        }
      });
    }
  }

  ngOnDestroy() {
    this.userProfileSubscription.unsubscribe();
    this.updateProfileSubscription.unsubscribe();
  }
}
