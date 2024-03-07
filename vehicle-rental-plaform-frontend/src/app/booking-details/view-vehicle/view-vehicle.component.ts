import { Component, Inject, Injectable } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Vehicles } from 'src/app/interfaces/Vehicles';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent {

  vehicle : Vehicles;

  constructor(@Inject (MAT_DIALOG_DATA) private data : Vehicles, private viewVehicle : MatDialogRef<ViewVehicleComponent>){
    
    this.vehicle = data;  
    console.log(this.vehicle);
  }

  close(): void {
    this.viewVehicle.close();
  }
}
