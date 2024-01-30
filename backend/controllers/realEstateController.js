const RealEstate = require("../models/RealEstate");
const Category = require("../models/Category");
const User = require("../models/User");
const Address = require("../models/Address");
const RealEstateImage = require("../models/RealEstateImage");

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
      image1,
      image2,
      image3,
      image4,
      category_name,
      id_broker,
      title,
      short_description,
      description,
      price,
      status,
      total_rates,
      no_of_reviews,
      address_country,
      address_city,
      address_street,
      address_zip_code,
      address_apartment,
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
      !image1 ||
      !category_name ||
      !id_broker ||
      !title ||
      !description ||
      !price ||
      !address_country ||
      !address_city ||
      !address_street ||
      !address_zip_code ||
      !address_apartment ||
      !no_of_rooms ||
      !no_of_floors ||
      !year_of_construction ||
      !parking_space ||
      elevator === undefined ||
      !square_footage ||
      best_seller === undefined
    ) {
      res.status(400).send("Missing data!");
      return 0;
    }

    const realEstateImage = await RealEstateImage.add(
      image1,
      image2,
      image3,
      image4,
      null,
      null,
      new Date()
    );

    if (!realEstateImage) {
      res.status(400).send(`Nie udało się utworzyć zdjęcia!`);
    }

    const address = await Address.addNewAddress(
      address_country,
      address_city,
      address_street,
      address_apartment,
      address_zip_code
    );
    if (!address) {
      res.status(400).send(`Nie udało się utworzyć adresu!`);
    }

    let category = await Category.getCategoryByName(category_name);
    if (!category) {
      res.status(400).send(`Nie znaleziono kategorii o nazwie ${category_name}!`);
    }

    let broker = await User.getUserById(id_broker);
    if (!broker) {
      res.status(400).send(`Nie znaleziono użytkownika o id ${id_broker}!`);
    }

    const real_estate = await RealEstate.addNewRealEstate(
      realEstateImage[realEstateImage.length - 1].id,
      category.id,
      id_broker,
      title,
      short_description,
      description,
      price,
      status,
      total_rates,
      no_of_reviews,
      address[address.length - 1].id,
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
      image1,
      image2,
      image3,
      image4,
      category_name,
      id_broker,
      title,
      short_description,
      description,
      price,
      status,
      total_rates,
      no_of_reviews,
      address_country,
      address_city,
      address_street,
      address_zip_code,
      address_apartment,
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
      !image1 ||
      !category_name ||
      !id_broker ||
      !title ||
      !description ||
      !price ||
      !address_country ||
      !address_city ||
      !address_street ||
      !address_zip_code ||
      !address_apartment ||
      !no_of_rooms ||
      !no_of_floors ||
      !year_of_construction ||
      !parking_space ||
      elevator === undefined ||
      !square_footage ||
      best_seller === undefined
    ) {
      res.status(400).send("Missing data!");
      return 0;
    }

    let realEstate = await RealEstate.getRealEstateById(id);
    if (!realEstate) {
      res.status(400).send(`Nie znaleziono oferty nieruchomości o id ${id}!`);
    }


    let realEstateImage = await RealEstateImage.editById(
      image1,
      image2,
      image3,
      image4,
      null,
      null,
      realEstate.id_real_estate_image
    );

    if (!realEstateImage) {
      res
        .status(400)
        .send(
          `Nie udało się zedytować zdjęć do oferty nieruchomości o id ${realEstate.id_real_estate_image}`
        );
    }

    let address = await Address.editAddressById(
      realEstate.id_address,
      address_country,
      address_city,
      address_street,
      address_apartment,
      address_zip_code,
    );

    if (!address) {
      res
        .status(400)
        .send(`Nie udało się zedytować adresu o id ${realEstate.id_address}`);
    }

    let category = await Category.getCategoryByName(category_name);
    if (!category) {
      res.status(400).send(`Nie znaleziono kategorii o nazwie ${category_name}!`);
    }

    let broker = await User.getUserById(id_broker);
    if (!broker) {
      res.status(400).send(`Nie znaleziono użytkownika o id ${id_broker}!`);
    }

    const real_estate = await RealEstate.editById(
      realEstateImage.id,
      category.id,
      id_broker,
      title,
      short_description,
      description,
      price,
      status,
      total_rates,
      no_of_reviews,
      address.id,
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

    let realEstate = RealEstate.getRealEstateById(id);
    if (!realEstate) {
      res.status(400).send(`Nie znaleziono oferty nieruchmości o id ${id}!`);
    }

    if (!RealEstateImage.deleteById(realEstate.id_real_estate_image)) {
      res
        .status(500)
        .send(
          `Nie udało się usunąć zdjęć nieruchomości o id ${realEstate.id_real_estate_image}!`
        );
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
