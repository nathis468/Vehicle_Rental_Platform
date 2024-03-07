package com.example.vehiclerentalplatform.service;

import com.example.vehiclerentalplatform.dto.MailInfo;

public interface EmailService {
    void sendEmail(MailInfo mailInfo);
}
