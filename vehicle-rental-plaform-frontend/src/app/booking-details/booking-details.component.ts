import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { BookingsService } from '../services/bookings.service';
import { BookingDetails } from '../interfaces/BookingDetails';
import { VehiclesService } from '../services/vehicles.service';
import { MatDialog } from '@angular/material/dialog';
import { Vehicles } from '../interfaces/Vehicles';
import { ViewVehicleComponent } from '../view-vehicle/view-vehicle.component';
import { RatingComponent } from './rating/rating.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { error } from 'highcharts';
import { MatSort, Sort, SortDirection } from '@angular/material/sort';
import { Subject, Subscription, TimeoutConfig, TimeoutError, TimeoutInfo, debounce, debounceTime, distinctUntilChanged } from 'rxjs';
import { CancelBookingComponent } from './cancel-booking/cancel-booking.component';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent {
  constructor(private bookingsService: BookingsService, private vehicleService: VehiclesService, private dialog: MatDialog, private changeDetect: ChangeDetectorRef, private authService: AuthService) { }

  page: number = 1;
  pageSize: number = 5;
  active: string = '';
  direction: string = '';
  email: string = '';


  displayedColumns: string[] = ["carModelName", "email", "fromDate", "toDate", "price", "status", "cancel", "rating", "view"];
  dataSource = new MatTableDataSource<BookingDetails>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  searchedValue: string = '';
  private searchSubject = new Subject<string>();

  emailSubscription: Subscription = new Subscription();
  sortableSubscription: Subscription = new Subscription();
  searchSubscription: Subscription = new Subscription();
  bookingDetailsSubscription: Subscription = new Subscription();
  viewVehicleSubscription: Subscription = new Subscription();

  ngOnInit() {
    this.emailSubscription = this.authService.email.subscribe({
      next: (data) => {
        this.email = data;
      }
    })
    this.bookings(this.page, this.pageSize, this.searchedValue, '', '');

    this.searchSubscription = this.searchSubject.pipe(debounceTime(1000)).subscribe((data) => {
      this.bookings(this.page, this.pageSize, data, this.active, this.direction);
    });

  }

  ngAfterViewInit() {
    this.changeDetect.detectChanges();
    this.sortableSubscription = this.sort.sortChange.subscribe({
      next: (data: Sort) => {
        this.active = data.active;
        this.direction = data.direction;
        this.bookings(this.page, this.pageSize, this.searchedValue, data.active, data.direction);
      }
    })
  }


  timer: any;
  onFiltering(event: Event) {
    this.searchedValue = (event.target as HTMLInputElement).value;
    if (event.type === 'click') {
      this.bookings(this.page, this.pageSize, this.searchedValue, this.active, this.direction);
    }
    else {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.bookings(this.page, this.pageSize, this.searchedValue, this.active, this.direction);
      }, 1000)
    }
    this.searchSubject.next(this.searchedValue);
  }

  onPageChanges(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.bookings(this.page, this.pageSize, this.searchedValue, this.active, this.direction);
  }

  bookings(page: number, pageSize: number, searchedValue: string, active: string, direction: string) {
    this.bookingDetailsSubscription = this.bookingsService.getBookingDetails(this.email, page, pageSize, searchedValue, active, direction).subscribe({
      next: (response) => {
        this.paginatorProperties(response);
      }
    })
  }

  paginatorProperties(response) {
    this.dataSource.data = response.body.content;
    this.paginator.pageIndex = response.body.number;
    this.paginator.pageSize = response.body.size;
    this.paginator.length = response.body.totalElements;
  }

  vehicle: Vehicles;

  viewVehicle(item: BookingDetails) {

    this.viewVehicleSubscription = this.vehicleService.getVehicle(item.vehcileDetails).subscribe({
      next: (response) => {
        this.vehicle = response.body;
      },
      complete: () => {
        this.dialog.open(ViewVehicleComponent, { data: this.vehicle, width: "650px" });
      }
    })
  }

  provideRating(item: BookingDetails) {
    this.dialog.open(RatingComponent, { data: item, height: "250px", width: "300px" })
  }

  cancelBooking(element: BookingDetails) {
    this.dialog.open(CancelBookingComponent, { data: element });
  }

  ngOnDestroy() {
    this.emailSubscription.unsubscribe();
    this.sortableSubscription.unsubscribe();
    this.searchSubscription.unsubscribe();
    this.bookingDetailsSubscription.unsubscribe();
    this.viewVehicleSubscription.unsubscribe();
  }
}
