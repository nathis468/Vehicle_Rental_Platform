import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { BookingsService } from '../services/bookings.service';
import { BookingDetails } from '../interfaces/BookingDetails';
import { VehiclesService } from '../services/vehicles.service';
import { MatDialog } from '@angular/material/dialog';
import { Vehicles } from '../interfaces/Vehicles';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';
import { RatingComponent } from './rating/rating.component';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { error } from 'highcharts';
import { MatSort, Sort, SortDirection } from '@angular/material/sort';
import { debounce, debounceTime } from 'rxjs';


@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent {
  constructor(private bookingsService : BookingsService, private vehicleService : VehiclesService, private dialog: MatDialog, private changeDetect: ChangeDetectorRef) {}

  page = 1;
  pageSize = 5;

  displayedColumns :string[] = ["carModelName", "email", "fromDate", "toDate", "price", "status", "rating", "view"];
  dataSource  = new MatTableDataSource<BookingDetails>() ;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  ngOnInit(){
    this.bookings(this.page,this.pageSize,this.searchedValue,'','');
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    this.changeDetect

    this.sort.sortChange.subscribe({
      next: (data: Sort) => {
        this.bookings(this.page,this.pageSize,this.searchedValue,data.active,data.direction);
      }
    })
  }

  searchedValue: string = '';
  timer: any;
  onFiltering(event: Event){
    this.searchedValue = (event.target as HTMLInputElement).value;
    if(event.type === 'click'){
      this.bookings(this.page,this.pageSize,this.searchedValue,'','');
    } 
    else{
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.bookings(this.page,this.pageSize,this.searchedValue,'','');
      },2000)
    }
  }

  onPageChanges(event: PageEvent){
    this.page = event.pageIndex+ 1;
    this.pageSize = event.pageSize;
    this.bookings(this.page,this.pageSize,this.searchedValue,'','');
  }
    
  bookings(page,pageSize,searchedValue,active,direction){
    this.bookingsService.getBookingDetails(localStorage.getItem('email'),page,pageSize,searchedValue,active,direction).subscribe({
      next: (response) => {
        this.paginatorProperties(response); 
      },
      error: () => {
        console.log(error);
        
      },
      complete: () => {       
      }
    })
  }

  paginatorProperties(response) {
    this.dataSource.data = response.body.content;
    this.paginator.pageIndex = response.body.number;
    this.paginator.pageSize = response.body.size;
    this.paginator.length = response.body.totalElements;
  }

  vehicle : Vehicles;

  viewVehicle(item : BookingDetails){  
    
    this.vehicleService.getVehicle(item.vehcileDetails).subscribe({
      next: (response) => {
        this.vehicle = response.body;
      },
      error: (error) => {
        console.log(error);
        
      },
      complete: () => {
        this.dialog.open(ViewVehicleComponent,{data : this.vehicle, height: "800px", width: "650px"});
      }
    })
  }

  provideRating(item :BookingDetails) {
    this.dialog.open(RatingComponent,{ data: item, height: "250px", width: "300px"})
  }  
}
