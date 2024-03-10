import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hide: boolean = true;

  constructor(private registerService : RegisterService, private router : Router) { }

  register : FormGroup;

  registerSubscription: Subscription;

  ngOnInit() {
    this.register = new FormGroup({
      userName : new FormControl<string>('',Validators.required),
      email : new FormControl<string>('',[Validators.required,Validators.email]),
      password : new FormControl<string>('',Validators.required),
      contactNumber : new FormControl<string>('',Validators.required),
    })
  }

  onSubmit() {
    if(this.register.valid === true){
      this.registerSubscription = this.registerService.register(this.register.value).subscribe({
        next : (response) => {
          if(response.status === 200){
            this.router.navigate(['login']);
          }
        }
      })
    }
  }

  ngOnDestroy() {
    this.registerSubscription.unsubscribe();
  }

}
