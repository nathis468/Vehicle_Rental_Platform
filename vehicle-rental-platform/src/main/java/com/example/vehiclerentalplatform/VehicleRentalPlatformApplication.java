package com.example.vehiclerentalplatform;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.messaging.ChangeStreamRequest;
import org.springframework.data.mongodb.core.messaging.DefaultMessageListenerContainer;
import org.springframework.data.mongodb.core.messaging.MessageListener;
import org.springframework.data.mongodb.core.messaging.MessageListenerContainer;
import org.springframework.data.mongodb.core.messaging.Subscription;
import org.springframework.scheduling.annotation.EnableScheduling;

import com.example.vehiclerentalplatform.dto.Student;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.model.changestream.ChangeStreamDocument;

@SpringBootApplication
@EnableScheduling
public class VehicleRentalPlatformApplication {

	public static void main(String[] args) {
		SpringApplication.run(VehicleRentalPlatformApplication.class, args);
	}

    @Bean
    Void changestream() {
        MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017/admin?replicaSet=rs0");
        MongoTemplate mongoTemplate = new MongoTemplate(mongoClient, "changestream");

        MessageListenerContainer container = new DefaultMessageListenerContainer(mongoTemplate);
        container.start();
		
		MessageListener<ChangeStreamDocument<Document>, Student> listener = (message) -> {
            System.out.println("message called");
            System.out.println("Received change event: " + message.getBody());
        };

        ChangeStreamRequest<Student> request = ChangeStreamRequest.builder().database("changestream").publishTo(listener).build();
        Subscription subscription = container.register(request, Student.class);
        container.stop();
        
		return null;
	}

}
