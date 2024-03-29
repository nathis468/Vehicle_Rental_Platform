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

  vehicle: Vehicles;

  removeVehicleSubscription: Subscription = new Subscription();

  constructor(@Inject(MAT_DIALOG_DATA) private data: Vehicles, private vehiclesService: VehiclesService, private snackBar: MatSnackBar) {
    this.vehicle = this.data;
  }

  deleteVehicle() {

    this.removeVehicleSubscription = this.vehiclesService.removeVehicle(this.vehicle.vehicles).subscribe({
      next: (response) => {
        console.log(response);

        if (response === true) {
          Swal.fire({
            text: "Deleted Vehicle Successfully",
            confirmButtonColor: '#545ff0'
          });
        }
        else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "The Vehicle has upcoming Rental Booking",
            confirmButtonColor: '#545ff0'
          });
        }
      },
      error: () => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          confirmButtonColor: '#545ff0'
        });
      },
    })
  }
}
