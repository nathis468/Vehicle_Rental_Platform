import { BookingDetails } from "./BookingDetails";

export interface Email{
    toEmail: string,
    subject: string,
    body: string,
    bookingDetails: BookingDetails;
}