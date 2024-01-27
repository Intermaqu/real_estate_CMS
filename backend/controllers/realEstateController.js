const RealEstate = require("../models/RealEstate");
const Category = require("../models/Category");
const User = require("../models/User");
const Address = require("../models/Address");

module.exports = {
  getAll: async (req, res) => {
    const allRealEstateOffers = await RealEstate.getAllRealEstateOffers();
    res.status(200).send(allRealEstateOffers);
  },

  getById: async (req, res) => {
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

  getForDataInterfaceById: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).send("Missing ID");
      return;
    }

    try {
      const real_estate = await RealEstate.getRealEstateForDataInterfaceById(
        id
      );

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

  add: async (req, res) => {
    const {
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
    } = req.body;

    if (
      !id_real_estate_image ||
      !id_category ||
      !id_broker ||
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
      best_seller === undefined
    ) {
      res.status(400).send("Missing data!");
      return 0;
    }

    let category = await Category.getCategoryById(id_category);
    if (!category) {
      res.status(400).send(`Nie znaleziono kategorii o id ${id_category}!`);
    }

    let broker = await User.getUserById(id_broker);
    if (!broker) {
      res.status(400).send(`Nie znaleziono użytkownika o id ${id_broker}!`);
    }

    let address = await Address.getAddressById(id_address);
    if (!address) {
      res.status(400).send(`Nie znaleziono adresu o id ${id_address}!`);
    }

    const real_estate = await RealEstate.addNewRealEstate(
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
    ).catch((e) => {
      console.log(e);
    });

    if (real_estate) {
      res.status(200).send("real_estate added");
    } else {
      res.status(400).send("Error");
    }
  },

  editById: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).send("Missing ID");
      return;
    }

    const {
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
    } = req.body;

    if (
      !id_real_estate_image ||
      !id_category ||
      !id_broker ||
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
      best_seller === undefined
    ) {
      res.status(400).send("Missing data!");
      return 0;
    }

    let category = await Category.getCategoryById(id_category);
    if (!category) {
      res.status(400).send(`Nie znaleziono kategorii o id ${id_category}!`);
    }

    let broker = await User.getUserById(id_broker);
    if (!broker) {
      res.status(400).send(`Nie znaleziono użytkownika o id ${id_broker}!`);
    }

    let address = await Address.getAddressById(id_address);
    if (!address) {
      res.status(400).send(`Nie znaleziono adresu o id ${id_address}!`);
    }

    const real_estate = await RealEstate.editById(
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
    ).catch((e) => {
      console.log(e);
    });

    if (real_estate) {
      res.status(200).send("Real estate edited");
    } else {
      res.status(400).send("Error");
    }
  },

  deleteById: async (req, res) => {
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
