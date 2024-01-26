const RealEstate = require("../models/RealEstate");
const Category = require("../models/Category");

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
      console.error("Błąd podczas pobierania oferty nieruchomości:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  getRealEstateForDataInterfaceById: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).send("Missing ID");
      return;
    }

    try {
      const real_estate = await RealEstate.getRealEstateForDataInterfaceById(id);

      if (real_estate) {
        res.status(200).json(real_estate);
      } else {
        res.status(404).send(`Nieruchomość o ID ${id} nie została znaleziona.`);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania oferty nieruchomości:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  addNewRealEstate: async (req, res) => {
    const {
      id_real_estate_image,

      category_name,
      category_description,
      category_image,
      category_created_at,
      category_active,

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
    } = req.body;

    console.log(req.body);

    if (
      !id_real_estate_image ||
      
      !category_name ||
      !category_description ||
      !category_image ||
      !category_created_at ||
      category_active === undefined ||

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
      best_seller === undefined ||
      !id_broker
    ) {
      res.status(400).send("Missing data!");
      return 0;
    }

    let category = await Category.addNewCategory(
      category_name,
      category_description,
      category_image,
      category_created_at,
      category_active,
    )

    console.log(category);

    const real_estate = await RealEstate.addNewRealEstate(
      id_real_estate_image,
      category.id,
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
    ).catch((e) => {
      console.log(e);
    });

    if (real_estate) {
      res.status(200).send("real_estate added");
    } else {
      res.status(400).send("Error");
    }
  },

  deleteRealEstateById: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).send("Missing ID");
      return;
    }

    const success = await RealEstate.deleteRealEstateById(id).catch((e) => {
      console.log(e);
      return false;
    });

    if (success) {
      res.status(200).send("Real estate deleted");
    } else {
      res.status(400).send("Error");
    }
  },
};
