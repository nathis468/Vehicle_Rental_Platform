export interface BookingDetails{
    id : string,
    bookingId: string,
    carModelName : string,
    email : string,
    fromDate : Date,
    toDate : Date,
    price : number,
    status : string,
    cancellationPolicy : string,
    vehcileDetails : string,
    paymentDate: Date,
    latitude: number,
    longitude: number,
    paymentId : string;
    currency : string;
    // bookingDate: Date;
}