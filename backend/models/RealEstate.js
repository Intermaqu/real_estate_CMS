require("dotenv").config();
const db = require("../db/config");

module.exports = {
  getAllRealEstateOffers: async () => {
    const allRealEstateOffers = await db.query("SELECT * FROM real_estate");
    return allRealEstateOffers.rows;
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
      "id_real_estate_image",
      "id_category",
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
      "elevator" bool,
      "square_footage",
      "id_broker",
      "best_seller") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)`,
      [
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
        best_seller,
      ]
    );
    return realEstate;
  },
};
