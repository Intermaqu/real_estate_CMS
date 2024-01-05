CREATE TABLE "address" (
  "id" integer PRIMARY KEY,
  "address_country" varchar,
  "address_city" varchar,
  "address_street" varchar,
  "address_apartment" varchar,
  "address_zip_code" varchar
);

CREATE TABLE "user" (
  "id" integer PRIMARY KEY,
  "id_address" integer,
  "username" varchar,
  "email" varchar,
  "password" varchar,
  "role" ENUM,
  "phone_number" varchar,
  "nip" char(10),
  "created_at" timestamp,
  "active" bool
);

CREATE TABLE "real_estate_image" (
  "id" integer PRIMARY KEY,
  "image_1" varchar,
  "image_2" varchar,
  "image_3" varchar,
  "image_4" varchar,
  "image_5" varchar,
  "image_6" varchar,
  "created_at" timestamp
);

CREATE TABLE "real_estate" (
  "id" integer PRIMARY KEY,
  "id_real_estate_image" integer,
  "id_category" integer,
  "title" varchar,
  "short_description" varchar,
  "description" varchar,
  "price" float,
  "status" ENUM,
  "total_rates" integer,
  "no_of_reviews" integer,
  "id_address" integer,
  "created_at" timestamp,
  "no_of_rooms" integer,
  "square_footage" float,
  "broker" int,
  "best_seller" bool
);

CREATE TABLE "category" (
  "id" integer PRIMARY KEY,
  "name" varchar,
  "image" varchar,
  "created_at" timestamp,
  "active" bool
);

CREATE TABLE "blog_post" (
  "id" integer PRIMARY KEY,
  "owner" id,
  "created_at" timestamp,
  "title" varchar,
  "image" varchar,
  "description" varchar,
  "active" bool
);

CREATE TABLE "banner" (
  "id" integer PRIMARY KEY,
  "title" varchar,
  "subtitle" varchar,
  "image" varchar,
  "url" vachar,
  "active" bool
);

CREATE TABLE "faq" (
  "id" integer PRIMARY KEY,
  "question" varchar,
  "answer" varchar
);

CREATE TABLE "testimonial" (
  "id" integer PRIMARY KEY,
  "full_name" varchar,
  "position" varchar,
  "comment" varchar,
  "created_at" timestamp,
  "active" bool
);

CREATE TABLE "broker_banner" (
  "id" integer PRIMARY KEY,
  "id_broker" integer,
  "comment" varchar,
  "active" bool
);

CREATE TABLE "company_info" (
  "id_address" int,
  "email" varchar,
  "phone_number_1" varchar,
  "phone_number_2" varchar,
  "about_us" varchar,
  "social_facebook_link" varchar,
  "social_twitter_link" varchar,
  "social_instagram_link" varchar,
  "social_google_link" varchar,
  "social_linked_in_link" varchar,
  "employees_content" varchar,
  "guaranteed_content" varchar,
  "consultation_content" varchar
);

CREATE TABLE "section_active_info" (
  "banner_active" bool,
  "best_seller_active" bool,
  "static_content" bool,
  "categories" bool,
  "brokers" bool,
  "blog" bool,
  "testimonials" bool
);

ALTER TABLE "blog_post" ADD FOREIGN KEY ("owner") REFERENCES "user" ("id");

ALTER TABLE "user" ADD FOREIGN KEY ("id") REFERENCES "broker_banner" ("id_broker");

ALTER TABLE "real_estate" ADD FOREIGN KEY ("broker") REFERENCES "user" ("id");

ALTER TABLE "real_estate" ADD FOREIGN KEY ("id_category") REFERENCES "category" ("id");

ALTER TABLE "address" ADD FOREIGN KEY ("id") REFERENCES "user" ("id_address");

ALTER TABLE "real_estate" ADD FOREIGN KEY ("id_real_estate_image") REFERENCES "real_estate_image" ("id");

ALTER TABLE "address" ADD FOREIGN KEY ("id") REFERENCES "real_estate" ("id_address");