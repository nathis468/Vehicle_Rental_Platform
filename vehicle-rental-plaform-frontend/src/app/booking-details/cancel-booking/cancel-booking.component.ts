import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { BookingDetails } from 'src/app/interfaces/BookingDetails';
import { Email } from 'src/app/interfaces/Email';
import { BookingsService } from 'src/app/services/bookings.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cancel-booking',
  templateUrl: './cancel-booking.component.html',
  styleUrls: ['./cancel-booking.component.css']
})
export class CancelBookingComponent {

  constructor(@Inject (MAT_DIALOG_DATA) private data : BookingDetails, private bookingsService: BookingsService) { }

  cancelBookingSubscription: Subscription;
  
  cancelBooking() {
    this.cancelBookingSubscription = this.bookingsService.cancelBooking(this.data).subscribe({
      next: (response) => {
        if(response.status === 200){
          Swal.fire("Cancelled Booking Successfully");
        }
      },
      complete: () => {
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
        
        data.bookingDetails = this.data;
        data.toEmail = "nathis468@gmail.com";

        this.bookingsService.sendEmail(data, 'cancelled').subscribe();
      }
    })
  }

  ngOnDestroy() {
    this.cancelBookingSubscription.unsubscribe();
  }
}