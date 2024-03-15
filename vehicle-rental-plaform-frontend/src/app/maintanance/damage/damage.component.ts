import { formatDate } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MaintananceService } from 'src/app/services/maintanance.service';
import { VehiclesService } from 'src/app/services/vehicles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-damage',
  templateUrl: './damage.component.html',
  styleUrls: ['./damage.component.css']
})
export class DamageComponent {
  data: any;

  constructor(@Inject(MAT_DIALOG_DATA) private passedData: any, private damage: MatDialogRef<DamageComponent>, private vehiclesService: VehiclesService, private maintananceService: MaintananceService) {
    this.data = this.passedData;
  }

  addService: FormGroup;

  carModelSelected: string;
  statusSelected: string;
  carModelOption: string[];

  carDetailsSubscription: Subscription = new Subscription();
  insertDetailsSubscription: Subscription = new Subscription();

  ngOnInit() {
    this.addService = new FormGroup({
      carModelName: new FormControl<string>('', Validators.required),
      maintananceType: new FormControl<string>(this.data.type, Validators.required),
      serviceDate: new FormControl(new Date()),
      price: new FormControl<number>(0),
      description: new FormControl<string>(''),
      status: new FormControl<string>('', Validators.required),
    })


    this.carDetailsSubscription = this.vehiclesService.getTotalCarDetails().subscribe({
      next: (response) => {
        this.carModelOption = response.body;
      }
    })
  }

  image: any;


  onCarModelNameChange(value: string) {
    this.addService.patchValue({
      carModelName: value
    })
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.addService.patchValue({
      serviceDate: event.value,
    });
  }

  onStatusChanges(value: string) {
    this.addService.patchValue({
      status: value
    })
  }


  fileName: string = '';

  onFileUpload(event: Event) {
    this.image = (event.target as HTMLInputElement).files[0];
    this.fileName = this.image?.name || '';
  }


  onSubmit() {
    if (this.addService.valid) {
      this.addService.patchValue({
        carModelName: this.carModelSelected
      })

      this.addService.value.serviceDate = this.addService.value.serviceDate.toDateString();

      const formData = new FormData();
      formData.append('carModelName', this.addService.get('carModelName').value);
      formData.append('maintananceType', this.addService.get('maintananceType').value);
      formData.append('serviceDate', this.addService.get('serviceDate').value);
      formData.append('price', this.addService.get('price').value);
      formData.append('description', this.addService.get('description').value);
      formData.append('status', this.addService.get('status').value);
      formData.append('file', this.image)

      this.insertDetailsSubscription = this.maintananceService.sendDetails(formData).subscribe({
        next: (response) => {
          if (response.status === 200) {
            Swal.fire("Inserted New Record");
          }
        },
        complete: () => {
          this.damage.close();
        }
      })
    }

  }

  ngOnDestroy() {
    this.carDetailsSubscription.unsubscribe();
    this.insertDetailsSubscription.unsubscribe();
  }
}
