// package com.example.vehiclerentalplatform.dao;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.data.mongodb.core.MongoTemplate;
// import org.springframework.data.mongodb.core.aggregation.Aggregation;
// import org.springframework.data.mongodb.core.aggregation.LookupOperation;
// import org.springframework.data.mongodb.core.query.Criteria;
// import org.springframework.stereotype.Repository;

// import com.example.vehiclerentalplatform.security.model.UserEntity;

// @Repository
// public class UserPermissionsDAO {
//     @Autowired
//     MongoTemplate template;

//     public UserEntity updateUserRolePermissions(String user) {

//         LookupOperation lookupOperation = LookupOperation.newLookup()
//             .from("userEntity")
//             .localField("user")
//             .foreignField("_id")
//             .as("userDetails");

//         Aggregation aggregation = Aggregation.newAggregation(Aggregation.match(Criteria.where("user").exists(true)),lookupOperation);    
//     }
// }
