const db = require("../db/config");

module.exports = {
  addNewAddess: async (country, city, street, apartmentNum, postCode) => {
    await db.query(`INSERT INTO address VALUES ($1, $2, $3, $4, $5)`, [
      country,
      city,
      street,
      apartmentNum,
      postCode,
    ]);
    let address = await db.query(
      `SELECT * FROM address WHERE "Country" = $1 AND "City" = $2 AND "Street" = $3 AND "Appartment" = $4 AND "Postal_Code" = $5`,
      [country, city, street, apartmentNum, postCode]
    );
    return address.rows[0];
  },

  getAddressById: async (id) => {
    let address = await db.query(
      'SELECT * FROM address WHERE "ID_ADDRESS" = $1',
      [id]
    );
    return address.rows[0];
  },

  getAddressById2: async (req, res) => {
    let address = await db.query(
      'SELECT * FROM address WHERE "ID_ADDRESS" = $1',
      [req.body.id]
    );
    res.status(200).send(address.rows[0]);
    // return address.rows[0];
  },
};