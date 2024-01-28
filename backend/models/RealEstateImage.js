const db = require("../db/config");

module.exports = {
  getById: async (id) => {
    let realEstateImage = await db.query(
      'SELECT * FROM real_estate_image WHERE "ID_REAL_ESTATE_IMAGE" = $1',
      [id]
    );
    return realEstateImage.rows[0];
  },

  add: async (
    image_1,
    image_2,
    image_3,
    image_4,
    image_5,
    image_6,
    created_at
  ) => {
    let realEstateImage = await db.query(
      `INSERT INTO real_estate_image ("image_1", "image_2", "image_3", "image_4", "image_5", "image_6", "created_at") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [image_1, image_2, image_3, image_4, image_5, image_6, created_at]
    );
    return realEstateImage;
  },

  editById: async (
    image_1,
    image_2,
    image_3,
    image_4,
    image_5,
    image_6,
    id
  ) => {
    let realEstate = await db.query(
      `UPDATE real_estate_image SET
      "image_1" = $1, 
      "image_2" = $2, 
      "image_3" = $3, 
      "image_4" = $4, 
      "image_5" = $5, 
      "image_6" = $6
      WHERE "id" = $7`,
      [image_1, image_2, image_3, image_4, image_5, image_6, id]
    );

    return realEstate;
  },

  deleteById: async (id) => {
    await db.query(`DELETE FROM real_estate_image WHERE "id" = $1`, [id]);

    console.log("Usunięto zdjęcia nieruchomości o id:", id);
    return true;
  },
};
