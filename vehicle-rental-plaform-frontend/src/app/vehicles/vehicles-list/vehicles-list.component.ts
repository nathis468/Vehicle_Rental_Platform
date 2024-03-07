import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Vehicles } from 'src/app/interfaces/Vehicles';
import { VehiclesService } from 'src/app/services/vehicles.service';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.css']
})
export class VehiclesListComponent {

  constructor(private vehiclesService : VehiclesService) {}
  
  @Input() vehiclesList : Vehicles[] = [];

  @Output() selectedVehicle = new EventEmitter<Vehicles>();

  @Input() noOfDays : number;

  ngOnInit(){ }

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


}
