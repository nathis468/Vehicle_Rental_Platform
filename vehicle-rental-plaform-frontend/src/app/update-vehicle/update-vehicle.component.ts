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

  vehicle: Vehicles;

  updateVehicleSubscription: Subscription = new Subscription();

  constructor(@Inject(MAT_DIALOG_DATA) private data: Vehicles, private updateVehicle: MatDialogRef<UpdateVehicleComponent>, private vehiclesService: VehiclesService, private snackBar: MatSnackBar, private route: Router) {
    this.vehicle = data;
  }

  editVehicle: FormGroup;

  ngOnInit() {
    this.editVehicle = new FormGroup({
      _id: new FormControl<string>(this.vehicle.vehicles._id),
      carModel: new FormControl<string>(this.vehicle.vehicles.carModel, Validators.required),
      seatingCapacity: new FormControl<number>(this.vehicle.vehicles.seatingCapacity, Validators.required),
      mileage: new FormControl<number>(this.vehicle.vehicles.mileage, Validators.required),
      fuelCapacity: new FormControl<number>(this.vehicle.vehicles.fuelCapacity, Validators.required),
      fuelType: new FormControl<string>(this.vehicle.vehicles.fuelType, Validators.required),
      insuranceCoverage: new FormControl<string>(this.vehicle.vehicles.insuranceCoverage, Validators.required),
      cancellationPolicy: new FormControl<string>(this.vehicle.vehicles.cancellationPolicy, Validators.required),
      price: new FormControl<number>(this.vehicle.vehicles.price, Validators.required),
      latitude: new FormControl<number>(this.vehicle.vehicles.latitude, Validators.required),
      longitude: new FormControl<number>(this.vehicle.vehicles.longitude, Validators.required),
    })
  }


  images: File[] = [];

  fileName: string[] = [];
  onFileUpload(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.images.push(files[i]);
        this.fileName.push(files[i].name);
      }
    }  }

  onSubmit() {

    // this.vehicle.vehicles = { ...this.vehicle.vehicles, ...this.editVehicle.value };

    const formData = new FormData();
    formData.append('id', this.editVehicle.value._id  );
    formData.append('carModel', this.editVehicle.value.carModel);
    formData.append('seatingCapacity', this.editVehicle.value.seatingCapacity);
    formData.append('mileage', this.editVehicle.value.mileage);
    formData.append('fuelCapacity', this.editVehicle.value.fuelCapacity);
    formData.append('fuelType', this.editVehicle.value.fuelType);
    formData.append('insuranceCoverage', this.editVehicle.value.insuranceCoverage);
    formData.append('cancellationPolicy', this.editVehicle.value.cancellationPolicy);
    formData.append('price', this.editVehicle.value.price);
    formData.append('latitude', this.editVehicle.value.latitude);
    formData.append('longitude', this.editVehicle.value.longitude);

    if (this.images.length !=0) {
      for (let i = 0; i < this.images.length; i++) {
        formData.append('file', this.images[i]);
      }
    } 
    
    else {
      const emptyFile = new File([""], "empty.txt", {
        type: "text/plain",
      });
      formData.append('file', emptyFile);
    }


    this.updateVehicleSubscription = this.vehiclesService.updateVehicle(formData).subscribe({
      next: () => {
        Swal.fire("Updated Vehicle Successfully");
        this.updateVehicle.close();
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
