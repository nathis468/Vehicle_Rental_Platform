package com.example.vehiclerentalplatform.service.implementaion;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.vehiclerentalplatform.dto.Payments;
import com.example.vehiclerentalplatform.service.PaymentService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;

@Service
@PropertySource("classpath:application.properties")
public class PaymentServiceImpl implements PaymentService {
    @Value("${razorpay.api.key}")
    private String apiKey;
 
    @Value("${razorpay.api.secret}")
    private String apiSecret;
 
    @Value("${razorpay.currency}")
    private String currency;
 
    @Value("${razorpay.company.name}")
    private String company;
 
    @Override
    @Transactional
    public Payments createTransaction(double amount) {
        try {
            RazorpayClient razorpayClient = new RazorpayClient(apiKey, apiSecret);
            JSONObject orderRequest = new JSONObject(); 
 
            orderRequest.put("amount", amount * 100);
            orderRequest.put("currency", currency);
            orderRequest.put("receipt", "order_rcptid_" + System.currentTimeMillis());
            orderRequest.put("payment_capture", 1);
 
            Order order= razorpayClient.orders.create(orderRequest);
 
            System.out.println(order);
            Integer receivedamount = order.get("amount");
            int getAmount = receivedamount/100;
            Payments payment = Payments.builder().orderId(order.get("id")).currency(order.get("currency")).amount(getAmount).key(apiKey).build();
            return payment;
 
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
