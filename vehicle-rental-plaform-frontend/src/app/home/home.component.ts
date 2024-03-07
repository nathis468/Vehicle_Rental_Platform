import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router : Router) {}

  ngOnInit() {
    console.log(JSON.parse(localStorage.getItem('profile')).profilePic);
    
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['']);
  }
}
