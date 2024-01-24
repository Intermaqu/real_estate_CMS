CREATE TYPE real_estate_status AS ENUM ('AVAILABLE', 'BOOKED', 'SOLD', 'INACTIVE');
CREATE TYPE user_role AS ENUM ('ADMIN', 'BROKER', 'AUTHORIZED_USER', 'UNAUTHORIZED_USER');

CREATE TABLE "address" (
  "id" SERIAL PRIMARY KEY,
  "address_country" varchar,
  "address_city" varchar,
  "address_street" varchar,
  "address_apartment" varchar,
  "address_zip_code" varchar
);

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "id_address" integer,
  -- "id_broker" integer,
  "firstName" varchar,
  "secondName" varchar,
  "firstSurname" varchar,
  "secondSurname" varchar,
  "email" varchar,
  "password" varchar,
  "role" user_role,
  "phone_number" varchar,
  "nip" char(10),
  "created_at" timestamp,
  "active" bool
);

CREATE TABLE "real_estate_image" (
  "id" SERIAL PRIMARY KEY,
  "image_1" varchar,
  "image_2" varchar,
  "image_3" varchar,
  "image_4" varchar,
  -- "image_5" varchar,
  -- "image_6" varchar,
  "created_at" timestamp
);

CREATE TABLE "real_estate" (
  "id" SERIAL PRIMARY KEY,
  "id_real_estate_image" integer,
  "id_category" integer,
  "title" varchar,
  "short_description" varchar,
  "description" varchar,
  "price" float,
  "status" real_estate_status,
  "total_rates" integer,
  "no_of_reviews" integer,
  "id_address" integer,
  "created_at" timestamp,
  "no_of_rooms" integer,
  "no_of_floors" integer,
  "year_of_construction" integer,
  "parking_space" varchar,
  "elevator" bool,
  "square_footage" float,
  "id_broker" integer,
  "best_seller" bool
);

CREATE TABLE "category" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "description" varchar,
  "image" varchar,
  "created_at" timestamp,
  "active" bool
);

CREATE TABLE "blog_post" (
  "id" SERIAL PRIMARY KEY,
  "owner" integer,
  "created_at" timestamp,
  "title" varchar,
  "image" varchar,
  "description" varchar,
  "active" bool
);

CREATE TABLE "banner" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar,
  "subtitle" varchar,
  "image" varchar,
  "url" varchar,
  "active" bool
);

CREATE TABLE "faq" (
  "id" SERIAL PRIMARY KEY,
  "question" varchar,
  "answer" varchar
);

CREATE TABLE "testimonial" (
  "id" SERIAL PRIMARY KEY,
  "full_name" varchar,
  "position" varchar,
  "comment" varchar,
  "created_at" timestamp,
  "active" bool
);

CREATE TABLE "broker_banner" (
  "id" SERIAL PRIMARY KEY,
  "id_broker" integer,
  "comment" varchar,
  "active" bool
);

CREATE TABLE "company_info" (
  "id" SERIAL PRIMARY KEY,
  "id_address" integer,
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
  "id" SERIAL PRIMARY KEY,
  "banner_active" bool,
  "best_seller_active" bool,
  "static_content" bool,
  "categories" bool,
  "brokers" bool,
  "blog" bool,
  "testimonials" bool
);

ALTER TABLE "blog_post" ADD FOREIGN KEY ("owner") REFERENCES "user" ("idSERIAL

ALTER TABLE "broker_banner" ADD FOREIGN KEY ("id_broker") REFERENCES "user" ("idSERIAL

ALTER TABLE "real_estate" ADD FOREIGN KEY ("id_broker") REFERENCES "user" ("idSERIAL

ALTER TABLE "real_estate" ADD FOREIGN KEY ("id_category") REFERENCES "category" ("idSERIAL

ALTER TABLE "user" ADD FOREIGN KEY ("id_address") REFERENCES "user" ("idSERIAL

ALTER TABLE "real_estate" ADD FOREIGN KEY ("id_real_estate_image") REFERENCES "real_estate_image" ("idSERIAL

ALTER TABLE "real_estate" ADD FOREIGN KEY ("id_address") REFERENCES "address" ("idSERIAL
