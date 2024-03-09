import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingDetailsRoutingModule } from './booking-details-routing.module';
import { BookingDetailsComponent } from './booking-details.component';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RatingComponent } from './rating/rating.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CancelBookingComponent } from './cancel-booking/cancel-booking.component';


@NgModule({
  declarations: [
    BookingDetailsComponent,
    RatingComponent,
    CancelBookingComponent
  ],
  imports: [
    CommonModule,
    BookingDetailsRoutingModule,
    MatButtonModule,
    MatDialogModule,
    FontAwesomeModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class BookingDetailsModule { }
