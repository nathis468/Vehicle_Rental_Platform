import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { error } from 'highcharts';
import { Subscription } from 'rxjs';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hide: boolean = true;

  constructor(private registerService: RegisterService, private router: Router, private snackBar: MatSnackBar) { }

  register: FormGroup;

  registerSubscription: Subscription = new Subscription();

  ngOnInit() {
    this.register = new FormGroup({
      userName: new FormControl<string>('', Validators.required),
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      password: new FormControl<string>('', Validators.required),
      contactNumber: new FormControl<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    })
  }

  onSubmit() {
    if (this.register.valid === true) {
      this.registerSubscription = this.registerService.register(this.register.value).subscribe({
        next: (response) => {
          if (response.status === 200) {
            this.router.navigate(['login']);
          }
        },
        error: (error) => {
          if(error.error === "Email already exists") {
            this.openSnackBar('Email Already Exists');
          }
          else if(error.error === "Contact number already exists") {
            this.openSnackBar('Contact Number Already Exists')
          }
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
    this.registerSubscription.unsubscribe();
  }

}
