const RealEstate = require("../models/RealEstate");

module.exports = {
  getAllRealEstateOffers: async (req, res) => {
    const allRealEstateOffers = await RealEstate.getAllRealEstateOffers();
    res.status(200).send(allRealEstateOffers);
  },

  addNewRealEstate: async (req, res) => {
    const {
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
    } = req.body;

    if (
      !id_real_estate_image ||
      !id_category ||
      !title ||
      !short_description ||
      !description ||
      !price ||
      !status ||
      !total_rates ||
      !no_of_reviews ||
      !id_address ||
      !created_at ||
      !no_of_rooms ||
      !no_of_floors ||
      !year_of_construction ||
      !parking_space ||
      !elevator ||
      !square_footage ||
      !id_broker ||
      !best_seller
    ) {
      res.status(400).send("Missing data!");
      return 0;
    }

    res.status(200).send("Real estate created");
  },
};
