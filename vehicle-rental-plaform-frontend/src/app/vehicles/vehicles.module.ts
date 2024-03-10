import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesRoutingModule } from './vehicles-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateVehicleComponent } from '../update-vehicle/update-vehicle.component';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DeleteVehicleComponent } from './delete-vehicle/delete-vehicle.component';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [ 
    UpdateVehicleComponent,
    DeleteVehicleComponent
  ],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class VehiclesModule { }
