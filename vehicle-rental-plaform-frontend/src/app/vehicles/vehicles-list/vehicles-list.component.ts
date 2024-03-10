import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Vehicles } from 'src/app/interfaces/Vehicles';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { ViewVehicleComponent } from 'src/app/view-vehicle/view-vehicle.component';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css']
})
export class VehiclesListComponent {

  constructor(private vehiclesService : VehiclesService, private dialog: MatDialog) {}
  
  @Input() vehiclesList : Vehicles[] = [];

  @Output() selectedVehicle = new EventEmitter<Vehicles>();

  @Input() noOfDays : number;

  ngOnInit() { }
  
  onClick(event : Vehicles){
    this.selectedVehicle.emit(event);
  }

  @Output() updateVehicle = new EventEmitter<Vehicles>();

  updateEvent(event : Vehicles){
    this.updateVehicle.emit(event);
  }

  @Output() deleteVehicle = new EventEmitter<Vehicles>();

  deleteEvent(event : Vehicles){
    this.deleteVehicle.emit(event);
  }

  viewInfo(vehicle: Vehicles) {
    this.dialog.open(ViewVehicleComponent,{data : vehicle, height: "800px", width: "650px"});
  }

  isLoading: boolean = false;
  currentPage: number = 0;
}
