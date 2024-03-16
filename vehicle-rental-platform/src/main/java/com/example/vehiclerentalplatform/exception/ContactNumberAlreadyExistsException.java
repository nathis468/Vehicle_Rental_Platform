package com.example.vehiclerentalplatform.exception;

public class ContactNumberAlreadyExistsException extends RuntimeException{
    public ContactNumberAlreadyExistsException(String message) {
        super(message);
    }
}
