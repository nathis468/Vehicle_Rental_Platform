package com.example.vehiclerentalplatform.service.implementaion;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.example.vehiclerentalplatform.dto.MailInfo;
import com.example.vehiclerentalplatform.service.EmailService;

@Service
public class EmailServiceImpl implements EmailService{
    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendEmail(MailInfo mailInfo, String status) {

        System.out.println(mailInfo.getToEmail());
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mailInfo.getToEmail());

        String quotes;
        if(status.equalsIgnoreCase("confirmed")){
            quotes = "Thank you for booking a car with us";
        }
        else{
            quotes = "We are sorry to see you";
        }

        String emailContent = "Dear Customer,\n\n"
                + quotes + "\n\n"
                + "Booking Details:\n"
                + "Car Model: " + mailInfo.getBookingDetails().getCarModelName() + "\n"
                + "Pickup Location: " + mailInfo.getBookingDetails().getLatitude() + mailInfo.getBookingDetails().getLongitude() + "\n"
                + "Pickup Date: " + mailInfo.getBookingDetails().getFromDate() + "\n"
                + "Drop-off Date: " + mailInfo.getBookingDetails().getToDate() + "\n\n"
                + "has been " + status + ". "
                + "We look forward to serving you.\n\n"
                + "Best regards,\n"
                + "Car Rental Service";
        message.setText(emailContent);
        message.setSubject(mailInfo.getSubject());
        mailSender.send(message);
    }
}
