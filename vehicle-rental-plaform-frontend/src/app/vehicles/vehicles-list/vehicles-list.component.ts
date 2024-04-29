import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Vehicles } from 'src/app/interfaces/Vehicles';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { ViewVehicleComponent } from 'src/app/view-vehicle/view-vehicle.component';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css'],
  animations: [
    trigger('imageFade', [
      transition(':increment', [
        style({ opacity: 0 }),
        animate('0.3s', style({ opacity: 1 }))
      ]),
      transition(':decrement', [
        style({ opacity: 0 }),
        animate('0.3s', style({ opacity: 1 }))
      ]),
    ])
  ]
})
export class VehiclesListComponent {

  constructor(private vehiclesService: VehiclesService, private dialog: MatDialog) { }

  @Input() vehiclesList: Vehicles[] = [];

  @Output() selectedVehicle = new EventEmitter<Vehicles>();

  @Input() noOfDays: number;

  @Input() remainingData: boolean = false;
  
  onClick(event: Vehicles) {
    this.selectedVehicle.emit(event);
  }

  @Output() updateVehicle = new EventEmitter<Vehicles>();

  updateEvent(event: Vehicles) {
    this.updateVehicle.emit(event);
  }

  @Output() deleteVehicle = new EventEmitter<Vehicles>();

  deleteEvent(event: Vehicles) {
    this.deleteVehicle.emit(event);
  }

  viewInfo(vehicle: Vehicles) {
    this.dialog.open(ViewVehicleComponent, { data: vehicle, width: "650px" });
  }

  isLoading: boolean = false;

  interval: any;
  hoverImage(item: Vehicles) {
    this.interval = setInterval(() => {
      if(item.currentImage < item.vehicles.images.length-1){
        item.currentImage++;
      }
      else{
        item.currentImage = 0;
      }
    }, 3000)
  }

  unhoverImage() {
    clearInterval(this.interval);
  }
}
