const db = require("../db/config");

module.exports = {
  getAllAddresses: async () => {
    let allAddresses = await db.query("SELECT * FROM address");
    return allAddresses.rows;
  },

  getAddressById: async (id) => {
    let address = await db.query(
      'SELECT * FROM address WHERE "ID_ADDRESS" = $1',
      [id]
    );
    return address.rows[0];
  },

  addNewAddress: async (country, city, street, apartmentNum, zipCode) => {
    await db.query(
      `INSERT INTO address ("address_country", "address_city", "address_street", "address_apartment", "address_zip_code") VALUES ($1, $2, $3, $4, $5)`,
      [country, city, street, apartmentNum, zipCode]
    );

    let address = await db.query(
      `SELECT * FROM address WHERE "address_country" = $1 AND "address_city" = $2 AND "address_street" = $3 AND "address_apartment" = $4 AND "address_zip_code" = $5`,
      [country, city, street, apartmentNum, zipCode]
    );

    return address.rows[0];
  },

  editAddressById: async (id, country, city, street, apartmentNum, zipCode) => {
    try {
      const result = await db.query(
        `UPDATE address 
         SET 
           "address_country" = $2,
           "address_city" = $3,
           "address_street" = $4,
           "address_apartment" = $5,
           "address_zip_code" = $6
         WHERE "id" = $1`,
        [id, country, city, street, apartmentNum, zipCode]
      );

      if (result.rowCount === 0) {
        console.log(`Nie znaleziono adresu o id: ${id}`);
        return null;
      }

      console.log(`Zaktualizowano adres o id: ${id}`);

      let editedAddress = await db.query(
        `SELECT * FROM address WHERE "id" = $1`,
        [id]
      );

      return editedAddress.rows[0];
    } catch (error) {
      console.error("Błąd podczas edycji adresu:", error);
      throw error;
    }
  },

  deleteAddressById: async (id) => {
    await db.query(`DELETE FROM address WHERE "id" = $1`, [id]);

    console.log("Usunięto adres o id:", id);
    return true;
  },
};
