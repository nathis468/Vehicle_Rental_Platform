import { Component } from '@angular/core';
import { VehiclesService } from '../services/vehicles.service';
import { Router } from '@angular/router';
import { Vehicles } from '../interfaces/Vehicles';
import { FormGroup } from '@angular/forms';
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

declare let Razorpay : any;

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})

export class VehiclesComponent {
  constructor(private vehiclesService : VehiclesService, private route:Router, private paymentService : PaymentService, private bookingsService : BookingsService, private dialog: MatDialog) {}
  
  vehiclesList : Vehicles[];
  
  noOfDays : number = 1;
  
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
    currency: ''
  };

  newEvent(event : Vehicles){
    if(this.bookingDetails.latitude !== 0 && this.bookingDetails.longitude != 0){
      console.log(event.vehicles.price * this.noOfDays);
      this.bookingDetails.carModelName = event.vehicles.carModel;
      this.bookingDetails.email = localStorage.getItem('email');
      this.bookingDetails.price = event.vehicles.price * this.noOfDays;
      this.bookingDetails.vehcileDetails = event.vehicles._id;
      this.bookingDetails.cancellationPolicy = event.vehicles.cancellationPolicy;
      this.bookingDetails.paymentDate = new Date();

      this.paymentService.createPayment(event.vehicles.price * this.noOfDays).subscribe({
        next :(response) => {
          console.log(response);
          this.payment(response.body);
        }
      })
    }
    else{
      Swal.fire("Please enter your current Location");
    }
  }

  payment(body : Payment) {
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
        if(response != null && response.razorpay_payment_id != null){
          this.bookingDetails.currency = body.currency;
          this.processResponse(response);
        }
        else{
          alert('Payment failed..'); 
        }
      },
      notes: { },
      modal: {
        ondismiss: () => {
          console.log('dismissed');
        }
      }
    }
    let razorpayObject: any = new Razorpay(options);
    razorpayObject.open();
  }


  processResponse(response: RazorPayOrder) {

    this.bookingDetails.paymentId = response.razorpay_payment_id;
    this.bookingDetails.status = 'confirmed';
    
    this.bookingsService.createBooking(this.bookingDetails).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
        
      },
      complete: () => {
        this.sendEmail();
        this.route.navigate(['home/booking-details']);
      }
    })
    console.log(response);
  }  

  sendEmail(){
    
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
        currency: ''
      }
    };

    data.bookingDetails = this.bookingDetails;
    // data.toEmail = localStorage.getItem('email');
    data.toEmail = "nathis468@gmail.com";
    this.bookingsService.sendEmail(data, 'confirmed').subscribe();
  }

  newFilter(event : FormGroup){
    
    this.bookingDetails.fromDate = event.value.startDate;
    this.bookingDetails.toDate = event.value.endDate;
    this.bookingDetails.latitude = event.value.latitude;
    this.bookingDetails.longitude = event.value.longitude;

    const timeDifference = new Date(event.value.endDate).getTime() - new Date(event.value.startDate).getTime();
    this.noOfDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24))+1;
    this.vehiclesService.getFilteredVehicles(event.value).subscribe({
      next : (response) => {
        this.vehiclesList = response.body;
      },
      error : (error) => {
        
      },
      complete : () => {

      }
    })
  }

  updateVehicle(event : Vehicles) {
    this.dialog.open(UpdateVehicleComponent,{data : event, height: "800px", width: "750px"});
  }

  deleteVehicle(event : Vehicles){
    this.dialog.open(DeleteVehicleComponent,{data : event});    
  }
}
