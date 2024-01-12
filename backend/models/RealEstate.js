require("dotenv").config();
const db = require("../db/config");

module.exports = {
  getAllRealEstateOffers: async () => {
    const allRealEstateOffers = await db.query("SELECT * FROM real_estate");
    return allRealEstateOffers.rows;
  },

  getRealEstateById: async (id) => {
    let real_estate = await db.query(
      'SELECT * FROM real_estate WHERE "id" = $1',
      [id]
    );
    return real_estate.rows[0];
  },

  addNewRealEstate: async (
    id_real_estate_image,
    id_category,
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
    id_broker,
    best_seller
  ) => {
    let realEstate = await db.query(
      `INSERT INTO real_estate (  
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
      "best_seller") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
      [
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
};

// {
//   "id_real_estate_image": 1,
//   "id_category": 3,
//   "title": "Przestronne mieszkanie z widokiem na morze",
//   "short_description": "Nowoczesne mieszkanie zlokalizowane w centrum miasta",
//   "description": "Piękne mieszkanie z trzema sypialniami, dużym salonem i nowoczesną kuchnią. Wspaniały widok na morze z balkonu.",
//   "price": 350000.0,
//   "status": "AVAILABLE",
//   "total_rates": 4,
//   "no_of_reviews": 2,
//   "id_address": 123,
//   "created_at": "2022-01-12T14:30:00Z",
//   "no_of_rooms": 3,
//   "no_of_floors": 5,
//   "year_of_construction": 2010,
//   "parking_space": "Garage",
//   "elevator": true,
//   "square_footage": 120.5,
//   "id_broker": 456,
//   "best_seller": false
// }
