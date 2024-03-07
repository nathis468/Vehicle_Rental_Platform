import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { PermissionsService } from 'src/app/services/permissions.service';
import { ProfileService } from 'src/app/services/ProfileService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  constructor(private loginService : LoginService, private router : Router, private snackBar : MatSnackBar, private permissionsService : PermissionsService, private profileService: ProfileService) { }

  login : FormGroup;

  ngOnInit() {
    this.login = new FormGroup({
      email : new FormControl<string>('',[Validators.required,Validators.email]),
      password : new FormControl<string>('',Validators.required),
    })
  }

  onSubmit() {
    if(this.login.valid === true){
      this.loginService.login(this.login.value).subscribe({
        
        next : (response) => {
          console.log(response);
          if(response.status == 200){
            this.localStoring(response);
            this.router.navigate(['home']);
          }
        },
        error : (error) => {
          if(error.status ===  401){
            this.openSnackBar('Invalid Credentials');
          }
        },
        complete : () => {
          // this.loginService.getUserProfile().subscribe({
          //   next: (response) => {
          //     console.log(response);
              
          //     this.profileService.setProfileDetails(response.body); 
          //   }
          // })
        }
      })
    }
  }

  localStoring(response){
    localStorage.setItem('permissions',JSON.stringify(response.body.permission));
    this.permissionsService.permissions.next(JSON.parse(localStorage.getItem('permissions')));
    localStorage.setItem('isLogin','true');
    localStorage.setItem('token',`${response.body.token}`);
    localStorage.setItem('email',`${this.login.value.email}`);
    localStorage.setItem('userInfo',JSON.stringify(response.body.userInfo));
    this.profileService.profileInfo.next(JSON.parse(localStorage.getItem('userInfo')));
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
