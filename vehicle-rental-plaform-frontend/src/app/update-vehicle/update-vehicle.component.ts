import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Vehicles } from '../interfaces/Vehicles';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VehiclesService } from '../services/vehicles.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.css']
})
export class UpdateVehicleComponent {

  vehicle : Vehicles;

  constructor(@Inject (MAT_DIALOG_DATA) private data : Vehicles, private updateVehicle : MatDialogRef<UpdateVehicleComponent>, private vehiclesService : VehiclesService, private snackBar: MatSnackBar) {
    this.vehicle = data;
  }

  editVehicle: FormGroup;

  ngOnInit() {
    this.editVehicle = new FormGroup({
      _id : new FormControl<string>(this.vehicle.vehicles._id),
      carModel  : new FormControl<string>(this.vehicle.vehicles.carModel,Validators.required),
      seatingCapacity  : new FormControl<string>(this.vehicle.vehicles.seatingCapacity,Validators.required),
      mileage  : new FormControl<string>(this.vehicle.vehicles.mileage,Validators.required),
      fuelCapacity  : new FormControl<string>(this.vehicle.vehicles.fuelCapacity,Validators.required),
      fuelType  : new FormControl<string>(this.vehicle.vehicles.fuelType,Validators.required),
      insuranceCoverage  : new FormControl<string>(this.vehicle.vehicles.insuranceCoverage,Validators.required),
      cancellationPolicy  : new FormControl<string>(this.vehicle.vehicles.cancellationPolicy,Validators.required),
      price  : new FormControl<number>(this.vehicle.vehicles.price,Validators.required),
      latitude  : new FormControl<number>(this.vehicle.vehicles.latitude,Validators.required),
      longitude  : new FormControl<number>(this.vehicle.vehicles.longitude,Validators.required),
    })
  }

  onSubmit(){
    this.vehicle.vehicles.carModel = this.editVehicle.get('carModel').value;
    this.vehicle.vehicles.seatingCapacity = this.editVehicle.get('seatingCapacity').value;
    this.vehicle.vehicles.mileage = this.editVehicle.get('mileage').value;
    this.vehicle.vehicles.fuelCapacity = this.editVehicle.get('fuelCapacity').value;
    this.vehicle.vehicles.fuelType = this.editVehicle.get('fuelType').value;
    this.vehicle.vehicles.insuranceCoverage = this.editVehicle.get('insuranceCoverage').value;
    this.vehicle.vehicles.cancellationPolicy = this.editVehicle.get('cancellationPolicy').value;
    this.vehicle.vehicles.price = this.editVehicle.get('price').value;
    this.vehicle.vehicles.latitude = this.editVehicle.get('latitude').value;
    this.vehicle.vehicles.longitude = this.editVehicle.get('longitude').value;
    

    console.log(this.vehicle);
    
    this.vehiclesService.updateVehicle(this.vehicle.vehicles).subscribe({
      next: (response) => {
        this.openSnackBar('Updated Successfully');
      },
      error: (error) => {

      },
      complete: () => {

      }
    })

  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
    this.updateVehicle.close();
  }

}
