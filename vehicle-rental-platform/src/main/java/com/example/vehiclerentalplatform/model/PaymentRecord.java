package com.example.vehiclerentalplatform.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "payments")
public class PaymentRecord {
    @Id
    private String _id;

    @Field("email")
    private String email;

    @Field("order_id")
    private String razorpay_order_id;

    @Field("payment_id")
    private String razorpay_payment_id;

    @Field("signature")
    private String razorpay_signature;

    @Field("payment_date")
    private Date paymentDate;
}
