package com.example.vehiclerentalplatform.dao;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.example.vehiclerentalplatform.model.Bookings;

@Repository
public class VehiclesDAO {
    @Autowired
    MongoTemplate template;

    public List<Bookings> filteredData1(Date startDate,Date endDate) throws ParseException{
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
}
