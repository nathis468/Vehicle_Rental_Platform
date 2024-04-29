package com.example.vehiclerentalplatform.dao;

import java.text.ParseException;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.example.vehiclerentalplatform.model.Bookings;

@Repository
public class VehiclesDAO {
    @Autowired
    MongoTemplate template;

    public List<Bookings> filteredData1(LocalDateTime startDate,LocalDateTime endDate) throws ParseException{
        Criteria criteria = new Criteria().orOperator(
            Criteria.where("from_date").gte(startDate).lte(endDate),
            Criteria.where("to_date").gte(startDate).lte(endDate),
            Criteria.where("from_date").lte(startDate).and("to_date").gte(startDate),
            Criteria.where("from_date").lte(endDate).and("to_date").gte(endDate)
            )
            .andOperator(Criteria.where("status").is("confirmed")
        );
        Query query=new Query(criteria);
        return template.find(query, Bookings.class);
    }

    public boolean deleteVehicle(String id) throws ParseException{
        AggregationOperation matchVehicle = Aggregation.match(Criteria.where("_id").is(id));
        AggregationOperation unwindBookings = Aggregation.unwind("$booking_details");
        AggregationOperation lookup = Aggregation.lookup("bookings", "booking_details", "booking_id", "bookings");
        AggregationOperation unwindBookingsResults = Aggregation.unwind("$bookings");
        AggregationOperation matchDate = Aggregation.match(Criteria.where("bookings.from_date").gte(new Date()));

        Aggregation aggregation = Aggregation.newAggregation(
                matchVehicle,
                unwindBookings,
                lookup,
                unwindBookingsResults,
                matchDate
        );

        AggregationResults<Bookings> results = template.aggregate(aggregation, "vehicles", Bookings.class);
        
        List<Bookings> result = results.getMappedResults();

        if (!result.isEmpty()) {
            return true;
        }
        return false;
    }
}
