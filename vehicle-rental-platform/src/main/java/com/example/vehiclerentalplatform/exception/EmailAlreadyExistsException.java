package com.example.vehiclerentalplatform.exception;

public class EmailAlreadyExistsException extends RuntimeException{
    public EmailAlreadyExistsException (String message) {
        super(message);
    }
}
