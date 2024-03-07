import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Vehicles } from 'src/app/interfaces/Vehicles';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { UpdateVehicleComponent } from 'src/app/update-vehicle/update-vehicle.component';

@Component({
  selector: 'app-delete-vehicle',
  templateUrl: './delete-vehicle.component.html',
  styleUrls: ['./delete-vehicle.component.css']
})
export class DeleteVehicleComponent {

  vehicle : Vehicles;

  constructor(@Inject (MAT_DIALOG_DATA) private data : Vehicles, private updateVehicle : MatDialogRef<UpdateVehicleComponent>, private vehiclesService : VehiclesService, private snackBar: MatSnackBar) {
    this.vehicle = data;
  }

  deleteVehicle() {
    
    this.vehiclesService.removeVehicle(this.vehicle.vehicles).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
        
      },
      complete : () => {

      }
    })
  }
  
}
