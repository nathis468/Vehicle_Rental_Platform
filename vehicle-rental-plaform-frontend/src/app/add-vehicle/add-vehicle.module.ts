import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddVehicleRoutingModule } from './add-vehicle-routing.module';
import { AddVehicleComponent } from './add-vehicle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    AddVehicleComponent
  ],
  imports: [
    CommonModule,
    AddVehicleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ]
})
export class AddVehicleModule { }
