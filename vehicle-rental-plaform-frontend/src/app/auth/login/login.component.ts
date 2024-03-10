import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';
import { ProfileService } from 'src/app/services/ProfileService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {  
  constructor(private loginService : LoginService, private router : Router, private snackBar : MatSnackBar, private authService : AuthService) { }

  login : FormGroup;

  hide: boolean = true;

  loginSubscription: Subscription;

  ngOnInit() {
    this.login = new FormGroup({
      email : new FormControl<string>('',[Validators.required,Validators.email]),
      password : new FormControl<string>('',Validators.required),
    })
  }

  onSubmit() {
    if(this.login.valid === true){
      this.loginSubscription = this.loginService.login(this.login.value).subscribe({
        next : (response) => {
          if(response.status == 200){
            this.loginService.localStoring(response);
          }
        },
        error : (error) => {
          if(error.status ===  401){
            this.openSnackBar('Invalid Credentials');
          }
        },
        complete : () => {
          this.authService.tokenDecode();
          this.router.navigate(['home']);
        }
      })
    }
  }


  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }
}
