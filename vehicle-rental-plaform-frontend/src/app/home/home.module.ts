import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { PermissionsDirective } from '../directives/permissions.directive';
import {MatSidenavModule} from '@angular/material/sidenav';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatMenuModule,
    MatIconModule,
    PermissionsDirective,
    MatSidenavModule
  ]
})
export class HomeModule { }
