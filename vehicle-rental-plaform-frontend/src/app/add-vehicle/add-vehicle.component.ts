import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VehiclesService } from '../services/vehicles.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent {

  constructor(private vehiclesService: VehiclesService, private router: Router) { }

  addVehicle: FormGroup;

  vehicleDetailsSubscription: Subscription = new Subscription();

  ngOnInit() {
    this.addVehicle = new FormGroup({
      carModel: new FormControl<string>('', Validators.required),
      seatingCapacity: new FormControl<number>(0, Validators.required),
      mileage: new FormControl<number>(0, Validators.required),
      fuelCapacity: new FormControl<number>(0, Validators.required),
      fuelType: new FormControl<string>('', Validators.required),
      insuranceCoverage: new FormControl<string>('', Validators.required),
      cancellationPolicy: new FormControl<string>('', Validators.required),
      price: new FormControl<string>('', Validators.required),
      latitude: new FormControl<string>('', Validators.required),
      longitude: new FormControl<string>('', Validators.required),
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
    }
  }

  onSubmit() {
    if (this.addVehicle.valid === true) {
      const formData = new FormData();
      formData.append('carModel', this.addVehicle.value.carModel);
      formData.append('seatingCapacity', this.addVehicle.value.seatingCapacity);
      formData.append('mileage', this.addVehicle.value.mileage);
      formData.append('fuelCapacity', this.addVehicle.value.fuelCapacity);
      formData.append('fuelType', this.addVehicle.value.fuelType);
      formData.append('insuranceCoverage', this.addVehicle.value.insuranceCoverage);
      formData.append('cancellationPolicy', this.addVehicle.value.cancellationPolicy);
      formData.append('price', this.addVehicle.value.price);
      formData.append('latitude', this.addVehicle.value.latitude);
      formData.append('longitude', this.addVehicle.value.longitude);
      for (let i = 0; i < this.images.length; i++) {
        formData.append('file', this.images[i]);
      }

      this.vehicleDetailsSubscription = this.vehiclesService.addVehicle(formData).subscribe({
        next: (response) => {
          if (response.status === 200) {
            Swal.fire("Inserted New Vehicle");
          }
        },
        error: () => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        },
        complete: () => {
          this.router.navigate(['home']);
        }
      })
    }
  }

  ngOnDestroy() {
    this.vehicleDetailsSubscription.unsubscribe();
  }
}
