db.po_tracing_workbench.insertMany(
[
  {
    "po_tracing_launch_config_metadata" : {
      "id" : "65fc3ec15778a20f7f2c40e2",
      "name" : "Po_1111_rr_111",
      "uuid" : "28aacada-6e45-4206-a816-3f93da11d5cf"
    },
    "config_name" : "Jan_29_2024_Praveen",
    "priority" : "HIGH",
    "request_type" : "ON_DEMAND",
    "data_collection_type" : "SCM",
    "product_metadata" : {
      "id" : "65278fcd62fba324d795fc07",
      "name" : "sawathi_sty_chck",
      "uuid" : "private11saw",
      "entity" : "STYLE"
    },
    "delivery_date" : ISODate("2024-03-10T00:00:00.000+0000"),
    "expiry_date" : ISODate("2024-02-25T00:00:00.000+0000"),
    "po_quantity" : {
      "quantity" : 1200.0,
      "unit" : "un_units"
    },
    "remaining_quantity" : {
      "quantity" : 0.0,
      "unit" : "un_units"
    },
    "tracing_status" : "NOT_FULFILLED",
    "status" : "IN_PROGRESS",
    "traceability_tags" : [
      "po_up_ram_11_111"
    ],
    "po_metadata" : {
      "id" : "65fc3e84dd69abe1d8a884e9",
      "name" : "po_up_ram_11_111"
    },
    "buyer_gln" : "646c5aef04e2ef1c88ece96b",
    "seller_metadata" : {
      "id" : "646c5e0604e2ef1c88ece9a4",
      "name" : "Demo Supplier 3",
      "uuid" : "Demo_s3"
    },
    "uuid" : "29435f66-9fdf-444b-94ab-6154bc4f061b",
    "create_ts": ISODate(),
    "update_ts": ISODate()
  },
  {
    "po_tracing_launch_config_metadata" : {
      "id" : "65f8089d3738fa73f665ff56",
      "name" : "praveen po test Mar18",
      "uuid" : "3f3059e2-6942-486c-81d1-87c02618b41d"
    },
    "config_name" : "MAR_18_2024_Praveen",
    "priority" : "LOW",
    "request_type" : "ON_DEMAND",
    "data_collection_type" : "EVIDENCE",
    "product_metadata" : {
      "entity" : "STYLE",
      "id" : "65278fcd62fba324d795fc07",
      "name" : "sawathi_sty_chck",
      "uuid" : "private11saw"
    },
    "delivery_date" : ISODate("2024-03-10T00:00:00.000+0000"),
    "expiry_date" : ISODate("2024-06-08T00:00:00.000+0000"),
    "po_quantity" : {
      "quantity" : 1005.0,
      "unit" : "un_units"
    },
    "remaining_quantity" : {
      "quantity" : 995.0,
      "unit" : "un_units"
    },
    "tracing_status" : "NOT_FULFILLED",
    "status" : "IN_PROGRESS",
    "traceability_tags" : [
      "po_ram_11"
    ],
    "po_metadata" : {
      "id" : "65eef25bdd69abe1d82c65e2",
      "name" : "po_ram_11"
    },
    "buyer_gln" : "646c5aef04e2ef1c88ece96b",
    "seller_metadata" : {
      "id" : "646c5e0604e2ef1c88ece9a4",
      "name" : "Demo Supplier 3",
      "uuid" : "Demo_s3"
    },
    "uuid" : "033eeddf-dde7-403a-a57e-1b4e44c65593",
    "create_ts": ISODate(),
    "update_ts": ISODate()
  },
  {
      "_id" : ObjectId("661685dbda2e0e5d5dd473dd"),
      "po_tracing_launch_config_metadata" : {
          "id" : "661685dbda2e0e5d5dd473db",
          "name" : "edit_untill_shipment",
          "uuid" : "a374598b-7ca2-4f98-bb98-b52c66b187c2"
      },
      "config_name" : "EVIDENCE CONFIG",
      "priority" : "HIGH",
      "request_type" : "ON_DEMAND",
      "data_collection_type" : "EVIDENCE",
      "product_metadata" : {
          "entity" : "STYLE",
          "id" : "65278fcd62fba324d795fc07",
          "name" : "sawathi_sty_chck",
          "uuid" : "private11saw"
      },
      "delivery_date" : ISODate("2024-06-15T00:00:00.000+0000"),
      "expiry_date" : ISODate("2024-05-16T00:00:00.000+0000"),
      "po_quantity" : {
          "quantity" : 1000.0,
          "unit" : "un_units"
      },
      "remaining_quantity" : {
          "quantity" : 0.0,
          "unit" : "un_units"
      },
      "tracing_status" : "FULFILLED",
      "status" : "SUBMITTED",
      "traceability_tags" : [
          "po_up_sc_test"
      ],
      "po_metadata" : {
          "id" : "66038b5bdd69abe1d85308e6",
          "name" : "po2_up_sc_test"
      },
      "buyer_gln" : "646c5aef04e2ef1c88ece96b",
      "seller_metadata" : {
          "id" : "646c5e0604e2ef1c88ece9a4",
          "name" : "Demo Supplier 3",
          "uuid" : "Demo_s3"
      },
      "uuid" : "84cbb606-6361-4aeb-a9c8-57d6663405ac",
      "update_ts" : ISODate("2024-04-15T07:53:57.450+0000"),
      "create_ts" : ISODate("2024-04-10T12:28:11.272+0000"),
      "created_by" : "646c5aef04e2ef1c88ece96d",
      "updated_by" : "646c5ebf04e2ef1c88ece9be",
      "entity_version" : NumberInt(0),
      "latest_source" : "APP"
 }
]
);