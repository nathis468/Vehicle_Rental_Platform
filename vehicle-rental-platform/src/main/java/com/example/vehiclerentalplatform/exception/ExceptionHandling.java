package com.example.vehiclerentalplatform.exception;

import org.apache.catalina.connector.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionHandling {
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<?> handleBadCredentialsException(BadCredentialsException exception){
        return ResponseEntity.status(Response.SC_UNAUTHORIZED).body(exception.getMessage());
    }

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<?> handleEmailAlreadyExistsException(EmailAlreadyExistsException exception) {
        return ResponseEntity.status(Response.SC_CONFLICT).body(exception.getMessage());
    }

    @ExceptionHandler(ContactNumberAlreadyExistsException.class)
    public ResponseEntity<?> handleContactNumberAlreadyExistsException(ContactNumberAlreadyExistsException exception) {
        return ResponseEntity.status(Response.SC_CONFLICT).body(exception.getMessage());
    }
}
