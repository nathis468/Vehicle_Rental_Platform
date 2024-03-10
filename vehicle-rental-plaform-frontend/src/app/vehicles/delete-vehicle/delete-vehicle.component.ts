import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Vehicles } from 'src/app/interfaces/Vehicles';
import { VehiclesService } from 'src/app/services/vehicles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-vehicle',
  templateUrl: './delete-vehicle.component.html',
  styleUrls: ['./delete-vehicle.component.css']
})
export class DeleteVehicleComponent {

  vehicle : Vehicles;
  
  removeVehicleSubscription: Subscription;

  constructor(@Inject (MAT_DIALOG_DATA) private data : Vehicles, private vehiclesService : VehiclesService, private snackBar: MatSnackBar) {
    this.vehicle = this.data;
  }

  deleteVehicle() {
    
    this.removeVehicleSubscription = this.vehiclesService.removeVehicle(this.vehicle.vehicles).subscribe({
      next: (response) => {
        if(response.status === 200){
          Swal.fire("Deleted Vehicle Successfully");
        }
      },
      error: () => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      },
    })
  }
  
}
