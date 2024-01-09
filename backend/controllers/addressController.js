const Address = require("../models/Address");

module.exports = {

  getAllAddresses: async (req, res) => {
    const allAddresses = await Address.getAllAddresses();
    res.status(200).send(allAddresses);
  },
};
