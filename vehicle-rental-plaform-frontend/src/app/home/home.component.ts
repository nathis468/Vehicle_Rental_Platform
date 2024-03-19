import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginService } from '../services/login.service';
import { UsersService } from '../services/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router, private authService: AuthService, private usersService: UsersService) { }

  profilePic: string = '';
  userName: string = '';

  profileInfoDubscription: Subscription = new Subscription();
  userProfileSubscription: Subscription = new Subscription();

  ngOnInit() {
    this.profileInfoDubscription = this.authService.profileInfo.subscribe({
      next: (profileInfo) => {
        this.profilePic = profileInfo.profilePic;
        this.userName = profileInfo.userName;
      }
    })

    this.authService.email.subscribe({
      next: (email) => {
        this.userProfileSubscription = this.usersService.getUserProfile(email).subscribe({
          next: (response) => {
            this.profilePic = response.body.profilePic;
            this.userName = response.body.userName;
          }
        });
      }
    })
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
