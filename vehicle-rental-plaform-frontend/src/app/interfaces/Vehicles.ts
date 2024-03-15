import { Ratings } from "./Ratings";

export interface Vehicles {
    distance: number,
    vehicles: {
        _id: string;
        carModel: string;
        seatingCapacity: number;
        mileage: number;
        fuelCapacity: number;
        fuelType: string;
        insuranceCoverage: string;
        cancellationPolicy: string;
        price: number;
        latitude: number,
        longitude: number,
        image: File,
        ratings: Ratings[];
        bookingDetails: string[];
    }
}