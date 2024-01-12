const RealEstate = require("../models/RealEstate");

module.exports = {
  getAllRealEstateOffers: async (req, res) => {
    const allRealEstateOffers = await RealEstate.getAllRealEstateOffers();
    res.status(200).send(allRealEstateOffers);
  },

  getRealEstateById: async (req, res) => {
    const { id } = req.params;
  
    if (!id) {
      res.status(400).send("Missing ID");
      return;
    }
  
    try {
      const real_estate = await RealEstate.getRealEstateById(id);
  
      if (real_estate) {
        res.status(200).json(real_estate);
      } else {
        res.status(404).send(`Real estate with ID ${id} not found`);
      }
    } catch (error) {
      console.error('Błąd podczas pobierania oferty nieruchomości:', error);
      res.status(500).send("Internal Server Error");
    }
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

    console.log(req.body)

    if (
      !id_real_estate_image ||
      !id_category
      // !title ||
      // !short_description ||
      // !description ||
      // !price ||
      // !status ||
      // !total_rates ||
      // !no_of_reviews ||
      // !id_address ||
      // !created_at ||
      // !no_of_rooms ||
      // !no_of_floors ||
      // !year_of_construction ||
      // !parking_space ||
      // !elevator ||
      // !square_footage ||
      // !id_broker ||
      // !best_seller
    ) {
      res.status(400).send("Missing data!");
      return 0;
    }

    const real_estate = await RealEstate.addNewRealEstate(
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
    ).catch((e) => {
      console.log(e);
    });

    if (real_estate) {
      res.status(200).send("real_estate added");
    } else {
      res.status(400).send("Error");
    }
  },
};
