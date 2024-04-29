import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Vehicles } from 'src/app/interfaces/Vehicles';
import { VehiclesService } from 'src/app/services/vehicles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-vehicle',
  templateUrl: './delete-vehicle.component.html',
  styleUrls: ['./delete-vehicle.component.css'],
  animations: [
    trigger('dialogFade', [
      state('open', style({
        height: '200px',
      })),
      state('closed', style({
        height: '0px',
      })),

      transition('* => closed', [
        animate('0.1s')
      ]),
      transition('* => open', [
        animate('0.15s')
      ]),
    ])
  ]
})
export class DeleteVehicleComponent {

  @Output() deletedVehicle: EventEmitter<string> = new EventEmitter<string>();

  dialogState: 'open' | 'closed' = 'open';

  vehicle: Vehicles;

  removeVehicleSubscription: Subscription = new Subscription();

  constructor(@Inject(MAT_DIALOG_DATA) private data: Vehicles, private vehiclesService: VehiclesService, private dialogRef: MatDialogRef<DeleteVehicleComponent>) {
    this.vehicle = this.data;
  }

  deleteVehicle() {
    this.removeVehicleSubscription = this.vehiclesService.removeVehicle(this.vehicle.vehicles).subscribe({
      next: (response) => {
        if (response === true) {
          this.deletedVehicle.emit(this.vehicle.vehicles._id);

          this.dialogRef.close(this.vehicle);
          Swal.fire({
            text: "Deleted Vehicle Successfully",
            confirmButtonColor: '#545ff0'
          });
        }
        else {
          this.dialogRef.close();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "The Vehicle has upcoming Rental Booking",
            confirmButtonColor: '#545ff0'
          });
        }
      },
      error: () => {
        this.dialogRef.close();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          confirmButtonColor: '#545ff0'
        });
      },
    })
  }

  animationClose() {
    this.dialogState = 'closed';
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
