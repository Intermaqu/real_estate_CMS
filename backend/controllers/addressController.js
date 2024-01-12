const Address = require("../models/Address");

module.exports = {
  getAllAddresses: async (req, res) => {
    const allAddresses = await Address.getAllAddresses();
    res.status(200).send(allAddresses);
  },

  getAddressById: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).send("Missing ID");
      return;
    }

    try {
      const address = await Address.getAddressById(id);

      if (address) {
        res.status(200).json(address);
      } else {
        res.status(404).send(`Address with ID ${id} not found`);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania adresu:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  addNewAddress: async (req, res) => {
    const body = req.body;
    if (
      !body.country ||
      !body.city ||
      !body.street ||
      !body.apartmentNum ||
      !body.zipCode
    ) {
      res.status(400).send("Missing data");
      return 0;
    }

    const address = await Address.addNewAddress(
      body.country,
      body.city,
      body.street,
      body.apartmentNum,
      body.zipCode
    ).catch((e) => {
      console.log(e);
    });

    if (address) {
      res.status(200).send("Address added");
    } else {
      res.status(400).send("Error");
    }
  },

  editAddressById: async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    if (!id) {
      res.status(400).send("Missing ID");
      return;
    }

    if (
      !body.country ||
      !body.city ||
      !body.street ||
      !body.apartmentNum ||
      !body.zipCode
    ) {
      res.status(400).send("Missing data");
      return;
    }

    try {
      const editedAddress = await Address.editAddressById(
        id,
        body.country,
        body.city,
        body.street,
        body.apartmentNum,
        body.zipCode
      );

      if (editedAddress) {
        res.status(200).json(editedAddress);
      } else {
        res.status(404).send(`Address with ID ${id} not found`);
      }
    } catch (error) {
      console.error("Błąd podczas edycji adresu:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  deleteAddressById: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).send("Missing ID");
      return;
    }

    const success = await Address.deleteAddressById(id).catch((e) => {
      console.log(e);
      return false;
    });

    if (success) {
      res.status(200).send("Address deleted");
    } else {
      res.status(400).send("Error");
    }
  },
};
