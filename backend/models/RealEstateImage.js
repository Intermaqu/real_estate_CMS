const db = require("../db/config");

module.exports = {
  addRealEstateImage: async (
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

  getRealEstateImageById: async (id) => {
    let realEstateImage = await db.query(
      'SELECT * FROM real_estate_image WHERE "ID_REAL_ESTATE_IMAGE" = $1',
      [id]
    );
    return realEstateImage.rows[0];
  },
};
