import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Vehicles } from '../interfaces/Vehicles';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VehiclesService } from '../services/vehicles.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.css']
})
export class UpdateVehicleComponent {

  vehicle : Vehicles;

  updateVehicleSubscription: Subscription;

  constructor(@Inject (MAT_DIALOG_DATA) private data : Vehicles, private updateVehicle : MatDialogRef<UpdateVehicleComponent>, private vehiclesService : VehiclesService, private snackBar: MatSnackBar, private route: Router) {
    this.vehicle = data;
  }

  editVehicle: FormGroup;

  ngOnInit() {
    this.editVehicle = new FormGroup({
      _id : new FormControl<string>(this.vehicle.vehicles._id),
      carModel  : new FormControl<string>(this.vehicle.vehicles.carModel,Validators.required),
      seatingCapacity  : new FormControl<number>(this.vehicle.vehicles.seatingCapacity,Validators.required),
      mileage  : new FormControl<number>(this.vehicle.vehicles.mileage,Validators.required),
      fuelCapacity  : new FormControl<number>(this.vehicle.vehicles.fuelCapacity,Validators.required),
      fuelType  : new FormControl<string>(this.vehicle.vehicles.fuelType,Validators.required),
      insuranceCoverage  : new FormControl<string>(this.vehicle.vehicles.insuranceCoverage,Validators.required),
      cancellationPolicy  : new FormControl<string>(this.vehicle.vehicles.cancellationPolicy,Validators.required),
      price  : new FormControl<number>(this.vehicle.vehicles.price,Validators.required),
      latitude  : new FormControl<number>(this.vehicle.vehicles.latitude,Validators.required),
      longitude  : new FormControl<number>(this.vehicle.vehicles.longitude,Validators.required),
    })
  }


  image : File;

  fileName: string = '';
  onFileUpload(event : Event){
    this.image = (event.target as HTMLInputElement).files[0];
    this.fileName = this.image?.name || '';
  }

  onSubmit(){
   
    this.vehicle.vehicles = { ...this.vehicle.vehicles, ...this.editVehicle.value };

    this.updateVehicleSubscription = this.vehiclesService.updateVehicle(this.vehicle.vehicles).subscribe({
      next: () => {
        Swal.fire("Updated Vehicle Successfully");
      },
      error: () => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      },
      complete: () => {
        this.route.navigate(['home/vehicles'])
      }
    })

  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
    this.updateVehicle.close();
  }

  ngOnDestroy() {
    this.updateVehicleSubscription.unsubscribe();
  }

}
