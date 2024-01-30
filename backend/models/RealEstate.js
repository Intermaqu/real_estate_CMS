require("dotenv").config();
const db = require("../db/config");

module.exports = {
  getAllRealEstateOffers: async () => {
    const allRealEstateOffers = await db.query(
      `SELECT 
      re.id,
      re.title, 
      re.price, 
      re.short_description,
      re.description, 
      re.status, 
      re.total_rates, 
      re.square_footage, 
      re.no_of_rooms, 
      re.no_of_floors, 
      re.year_of_construction, 
      re.parking_space, 
      re.elevator, 
      re.best_seller, 
      re.created_at,
      "user"."firstName" as broker_first_name, 
      "user"."firstSurname" as broker_first_surname, 
      "user"."email" as broker_email, 
      "user".phone_number as broker_phone_number, 
      c.name as category_name, 
      a.address_city, 
      a.address_street, 
      a.address_apartment, 
      a.address_zip_code, 
      a.address_country
  FROM 
      real_estate as re 
  LEFT JOIN 
      "user" ON re.id_broker = "user".id 
  LEFT JOIN 
      category c ON re.id_category = c.id 
  LEFT JOIN 
      address a ON re.id_address = a.id;
  `
    );
    return allRealEstateOffers.rows;
  },

  getRealEstateById: async (id) => {
    let real_estate = await db.query(
      'SELECT * FROM real_estate WHERE "id" = $1',
      [id]
    );
    return real_estate.rows[0];
  },

  getRealEstateForDataInterfaceById: async (id) => {
    let real_estate_info = await db.query(
      `SELECT 
        re.title, 
        re.price, 
        re.short_description, 
        re.description, 
        re.status, 
        re.total_rates, 
        re.square_footage, 
        re.no_of_rooms, 
        re.no_of_floors, 
        re.year_of_construction, 
        re.parking_space, 
        re.elevator, 
        re.square_footage, 
        re.best_seller, 
        re.created_at,
        "user"."firstName" as broker_first_name, 
        "user"."firstSurname" as broker_first_surname, 
        "user".phone_number as broker_phone_number, 
        c.name as category_name, 
        a.address_city, 
        a.address_street, 
        a.address_apartment, 
        a.address_zip_code, 
        a.address_country, 
        rei.image_1, 
        rei.image_2, 
        rei.image_3, 
        rei.image_4 
        FROM real_estate as re 
        LEFT JOIN "user" ON re.id_broker = "user".id 
        LEFT JOIN category c ON re.id_category = c.id 
        LEFT JOIN address a ON re.id_address = a.id  
        LEFT JOIN real_estate_image rei ON re.id_real_estate_image = rei.id 
        WHERE re.id = $1;`,
      [id]
    );

    return real_estate_info.rows[0];
  },

  addNewRealEstate: async (
    id_real_estate_image,
    id_category,
    id_broker,
    title,
    short_description,
    description,
    price,
    status,
    total_rates,
    no_of_reviews,
    id_address,
    created_at,
    no_of_rooms,
    no_of_floors,
    year_of_construction,
    parking_space,
    elevator,
    square_footage,
    best_seller
  ) => {
    let realEstate = await db.query(
      `INSERT INTO real_estate (  
      "id_real_estate_image",
      "id_category",
      "id_broker",
      "title",
      "short_description",
      "description",
      "price",
      "status",
      "total_rates",
      "no_of_reviews",
      "id_address",
      "created_at",
      "no_of_rooms",
      "no_of_floors",
      "year_of_construction",
      "parking_space",
      "elevator",
      "square_footage",
      "best_seller") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)`,
      [
        id_real_estate_image,
        id_category,
        id_broker,
        title,
        short_description,
        description,
        price,
        status,
        total_rates,
        no_of_reviews,
        id_address,
        created_at,
        no_of_rooms,
        no_of_floors,
        year_of_construction,
        parking_space,
        elevator,
        square_footage,
        best_seller,
      ]
    );

    return realEstate;
  },

  editById: async (
    id_real_estate_image,
    id_category,
    id_broker,
    title,
    short_description,
    description,
    price,
    status,
    total_rates,
    no_of_reviews,
    id_address,
    created_at,
    no_of_rooms,
    no_of_floors,
    year_of_construction,
    parking_space,
    elevator,
    square_footage,
    best_seller,
    id
  ) => {
    let realEstate = await db.query(
      `UPDATE real_estate SET
        "id_category" = $1,
        "id_broker" = $2,
        "title" = $3,
        "short_description" = $4,
        "description" = $5,
        "price" = $6,
        "status" = $7,
        "total_rates" = $8,
        "no_of_reviews" = $9,
        "id_address" = $10,
        "created_at" = $11,
        "no_of_rooms" = $12,
        "no_of_floors" = $13,
        "year_of_construction" = $14,
        "parking_space" = $15,
        "elevator" = $16,
        "square_footage" = $17,
        "best_seller" = $18,
        "id_real_estate_image" = $19
      WHERE "id" = $20`,
      [
        id_category,
        id_broker,
        title,
        short_description,
        description,
        price,
        status,
        total_rates,
        no_of_reviews,
        id_address,
        created_at,
        no_of_rooms,
        no_of_floors,
        year_of_construction,
        parking_space,
        elevator,
        square_footage,
        best_seller,
        id_real_estate_image,
        id,
      ]
    );

    return realEstate;
  },

  deleteRealEstateById: async (id) => {
    await db.query(`DELETE FROM real_estate WHERE "id" = $1`, [id]);

    console.log("Usunięto nieruchomość o id:", id);
    return true;
  },
};

// {
//   "id_real_estate_image": 1,
//   "id_category": 5,
//   "id_broker": 2,
//   "title": "Przestronne mieszkanie z widokiem na morze",
//   "short_description": "Nowoczesne mieszkanie zlokalizowane w centrum miasta",
//   "description": "Piękne mieszkanie z trzema sypialniami, dużym salonem i nowoczesną kuchnią. Wspaniały widok na morze z balkonu.",
//   "price": 350000.0,
//   "status": "AVAILABLE",
//   "total_rates": 4,
//   "no_of_reviews": 2,
//   "id_address": 16,
//   "created_at": "2022-01-12T14:30:00Z",
//   "no_of_rooms": 3,
//   "no_of_floors": 5,
//   "year_of_construction": 2010,
//   "parking_space": "Garage",
//   "elevator": true,
//   "square_footage": 120.5,
//   "best_seller": false
// }
