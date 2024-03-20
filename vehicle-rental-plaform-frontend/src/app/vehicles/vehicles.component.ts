import { Component, HostListener } from '@angular/core';
import { VehiclesService } from '../services/vehicles.service';
import { Router } from '@angular/router';
import { Vehicles } from '../interfaces/Vehicles';
import { FormControl, FormGroup } from '@angular/forms';
import { PaymentService } from '../services/payment.service';
import { Payment } from '../interfaces/Payment';
import { formatDate } from '@angular/common';
import { BookingDetails } from '../interfaces/BookingDetails';
import { BookingsService } from '../services/bookings.service';
import { RazorPayOrder } from '../interfaces/RazorPayOrder';
import Swal from 'sweetalert2'
import { MatDialog } from '@angular/material/dialog';
import { UpdateVehicleComponent } from '../update-vehicle/update-vehicle.component';
import { DeleteVehicleComponent } from './delete-vehicle/delete-vehicle.component';
import { Email } from '../interfaces/Email';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

declare let Razorpay: any;

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})

export class VehiclesComponent {
  constructor(private vehiclesService: VehiclesService, private route: Router, private paymentService: PaymentService, private bookingsService: BookingsService, private dialog: MatDialog, private authService: AuthService) { }

  vehiclesList: Vehicles[];

  noOfDays: number = 1;

  email: string = '';

  remainingData: boolean = false;

  emailSubscription: Subscription = new Subscription();
  paymentSubscription: Subscription = new Subscription();
  createBookingSubscription: Subscription = new Subscription();
  filteredVehiclesSubscription: Subscription = new Subscription();

  ngOnInit() {
    this.emailSubscription = this.authService.email.subscribe({
      next: (data) => {
        this.email = data;
      }
    })
  }

  bookingDetails: BookingDetails = {
    id: '',
    bookingId: '',
    carModelName: '',
    email: '',
    fromDate: new Date(),
    toDate: new Date(),
    price: 0,
    status: '',
    cancellationPolicy: '',
    vehcileDetails: '',
    paymentDate: new Date(),
    latitude: 0,
    longitude: 0,
    paymentId: '',
    currency: '',
    rating: ''
  };

  newEvent(event: Vehicles) {
    if (this.bookingDetails.latitude !== 0 && this.bookingDetails.longitude != 0) {
      this.bookingDetails.carModelName = event.vehicles.carModel;
      this.bookingDetails.email = this.email;
      this.bookingDetails.price = event.vehicles.price * this.noOfDays;
      this.bookingDetails.vehcileDetails = event.vehicles._id;
      this.bookingDetails.cancellationPolicy = event.vehicles.cancellationPolicy;
      this.bookingDetails.paymentDate = new Date();

      this.paymentSubscription = this.paymentService.createPayment(event.vehicles.price * this.noOfDays).subscribe({
        next: (response) => {
          this.payment(response.body);
        }
      })
    }
    else {
      Swal.fire({
        text: "Please enter your current Location",
        confirmButtonColor: '#545ff0'
      });
    }
  }

  payment(body: Payment) {
    const options: any = {
      key: body.key,
      amount: body.amount,
      currency: body.currency,
      name: 'Vehicle Rental Platform',
      description: '',
      image: './assets/VehicleRental Logo.png',
      order_id: body.orderId,
      theme: { color: '#0c238a' },
      handler: (response: RazorPayOrder) => {
        if (response != null && response.razorpay_payment_id != null) {
          this.bookingDetails.currency = body.currency;
          this.processResponse(response);
        }
        else {
          alert('Payment failed..');
        }
      },
      notes: {},
      modal: {
        ondismiss: () => {
        }
      }
    }
    let razorpayObject: any = new Razorpay(options);
    razorpayObject.open();
  }


  processResponse(response: RazorPayOrder) {

    this.bookingDetails.paymentId = response.razorpay_payment_id;
    this.bookingDetails.status = 'confirmed';

    this.createBookingSubscription = this.bookingsService.createBooking(this.bookingDetails).subscribe({
      next: () => {
        this.sendEmail();
        this.route.navigate(['home/booking-details']);
      }
    })
  }

  sendEmail() {

    let data: Email = {
      toEmail: '',
      subject: '',
      body: '',
      bookingDetails: {
        id: '',
        bookingId: '',
        carModelName: '',
        email: '',
        fromDate: new Date(),
        toDate: new Date(),
        price: 0,
        status: '',
        cancellationPolicy: '',
        vehcileDetails: '',
        paymentDate: new Date(),
        latitude: 0,
        longitude: 0,
        paymentId: '',
        currency: '',
        rating: ''
      }
    };

    data.bookingDetails = this.bookingDetails;

    this.authService.email.subscribe({
      next: (email) => {
        // data.toEmail = 'nathis468@gmail.com';
        data.toEmail = email;
        console.log(data.toEmail);
        this.bookingsService.sendEmail(data, 'confirmed').subscribe();
      }
    })

  }


  filter: FormGroup = new FormGroup({
    latitude: new FormControl<string>(''),
    longitude: new FormControl<string>(''),
    startDate: new FormControl<string>(formatDate(new Date(), 'yyyy-MM-dd', 'en')),
    endDate: new FormControl<string>(formatDate(new Date(), 'yyyy-MM-dd', 'en'))
  })

  newFilter(event: FormGroup) {
    this.filter.value.startDate = event.value.startDate;
    this.filter.value.endDate = event.value.endDate;
    this.filter.value.latitude = event.value.latitude;
    this.filter.value.longitude = event.value.longitude;

    this.bookingDetails.fromDate = event.value.startDate;
    this.bookingDetails.toDate = event.value.endDate;
    this.bookingDetails.latitude = event.value.latitude;
    this.bookingDetails.longitude = event.value.longitude;

    const timeDifference = new Date(event.value.endDate).getTime() - new Date(event.value.startDate).getTime();
    this.noOfDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 1;

    this.filteredVehiclesSubscription = this.vehiclesService.getFilteredVehicles(event.value, this.currentPage).subscribe({
      next: (response) => {
        this.vehiclesList = response.body;
      },
    })
  }

  updateVehicle(event: Vehicles) {
    this.dialog.open(UpdateVehicleComponent, { data: event, height: "800px", width: "750px" });
  }

  deleteVehicle(event: Vehicles) {
    this.dialog.open(DeleteVehicleComponent, { data: event });
  }

  currentPage: number = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    const documentHeight = document.body.scrollHeight;
    if (scrollPosition + windowHeight >= documentHeight && !this.remainingData) {
      this.currentPage++;
      this.filteredVehiclesSubscription = this.vehiclesService.getFilteredVehicles(this.filter.value, this.currentPage).subscribe({
        next: (response) => {
          console.log(response);
          
          if (response.body.length === 0) {
            this.remainingData = true;
          }
          else {
            this.vehiclesList = response.body;
          }
        }
      })
    }
  }

  ngOnDestroy() {
    this.emailSubscription.unsubscribe();
    this.paymentSubscription.unsubscribe();
    this.createBookingSubscription.unsubscribe();
    this.filteredVehiclesSubscription.unsubscribe();
  }
}
