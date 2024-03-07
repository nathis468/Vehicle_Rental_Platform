import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VehiclesService } from '../services/vehicles.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent {

  constructor(private vehiclesService : VehiclesService, private router: Router) {}

  addVehicle : FormGroup;
  
  ngOnInit() {
    this.addVehicle = new FormGroup({
      carModel  : new FormControl<string>('',Validators.required),
      seatingCapacity  : new FormControl<string>('',Validators.required),
      mileage  : new FormControl<string>('',Validators.required),
      fuelCapacity  : new FormControl<string>('',Validators.required),
      fuelType  : new FormControl<string>('',Validators.required),
      insuranceCoverage  : new FormControl<string>('',Validators.required),
      cancellationPolicy  : new FormControl<string>('',Validators.required),
      price  : new FormControl<string>('',Validators.required),
      latitude  : new FormControl<string>('',Validators.required),
      longitude  : new FormControl<string>('',Validators.required),
    })
  }

  image : any;

  onFileUpload(event : any){
    this.image = (event.target as HTMLInputElement).files[0];
  }

  onSubmit() {
    if(this.addVehicle.valid === true){
      const formData = new FormData();
      formData.append('carModel',this.addVehicle.value.carModel);
      formData.append('seatingCapacity',this.addVehicle.value.seatingCapacity);
      formData.append('mileage',this.addVehicle.value.mileage);
      formData.append('fuelCapacity',this.addVehicle.value.fuelCapacity);
      formData.append('fuelType',this.addVehicle.value.fuelType);
      formData.append('insuranceCoverage',this.addVehicle.value.insuranceCoverage);
      formData.append('cancellationPolicy',this.addVehicle.value.cancellationPolicy);
      formData.append('price',this.addVehicle.value.price);
      formData.append('latitude',this.addVehicle.value.latitude);
      formData.append('longitude',this.addVehicle.value.longitude);
      formData.append('file', this.image);

      this.vehiclesService.addVehicle(formData).subscribe({
        next: (response) => {
          if(response.status === 200){
            Swal.fire("Inserted New Vehicle");
          }
        },
        error: (error) => {
          console.log(error);
          
        },
        complete: () => {
          this.router.navigate(['home']);
        }
      })
    } 
  }
}
