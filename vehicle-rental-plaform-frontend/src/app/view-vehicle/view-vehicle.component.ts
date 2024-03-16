import { Component, ElementRef, Inject, Injectable } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Vehicles } from 'src/app/interfaces/Vehicles';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent {

  vehicle: Vehicles;

  constructor(@Inject(MAT_DIALOG_DATA) private data: Vehicles, private viewVehicle: MatDialogRef<ViewVehicleComponent>, private elementRef: ElementRef) {
    this.vehicle = this.data;
  }

  ngAfterViewInit() {
    const contentHeight = this.elementRef.nativeElement.scrollHeight;

    const minHeight = 750;
    const maxHeight = 1000;

    let dialogHeight = Math.min(Math.max(contentHeight, minHeight), maxHeight);

    this.viewVehicle.updateSize(minHeight + 'px', dialogHeight + 'px')
  }

  close(): void {
    this.viewVehicle.close();
  }
}
