import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { BookingDetails } from 'src/app/interfaces/BookingDetails';
import { BookingsService } from 'src/app/services/bookings.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {

  constructor(@Inject(MAT_DIALOG_DATA) private data: BookingDetails, private ratingVehicle: MatDialogRef<RatingComponent>, private bookingsService: BookingsService, private snackBar: MatSnackBar) { }

  faStar = faStar;

  rating: number = 0;
  readonly: boolean = false;

  ratingSubscription: Subscription = new Subscription();

  setRating(value: number) {
    if (this.readonly) return;
    this.rating = value;
  }

  sendRating() {
    this.data.rating = 'provided';
    this.bookingsService.provideRating(this.data, this.rating).subscribe();
  }

  ngOnDestroy() {
    this.ratingSubscription.unsubscribe();
  }
}
