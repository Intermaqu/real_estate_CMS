const db = require("../db/config");

module.exports = {
  getAllBanners: async () => {
    let allBanners = await db.query("SELECT * FROM banner");
    return allBanners.rows;
  },

  getBannerById: async (id) => {
    let banner = await db.query('SELECT * FROM banner WHERE "id" = $1', [id]);
    return banner.rows[0];
  },

  addNewBanner: async (title, subtitle, image, url, active) => {
    let banner = await db.query(
      `INSERT INTO banner ("title", "subtitle", "image", "url", "active") VALUES ($1, $2, $3, $4, $5)`,
      [title, subtitle, image, url, active]
    );

    return banner;
  },

  editBannerById: async (id, title, subtitle, image, url, active) => {
    try {
      const result = await db.query(
        `UPDATE banner 
         SET 
           "title" = $2,
           "subtitle" = $3,
           "image" = $4,
           "url" = $5,
           "active" = $6
         WHERE "id" = $1`,
        [id, title, subtitle, image, url, active]
      );

      if (result.rowCount === 0) {
        console.log(`Nie znaleziono banner o id: ${id}`);
        return null;
      }

      console.log(`Zaktualizowano banner o id: ${id}`);

      let editedBanner = await db.query(
        `SELECT * FROM banner WHERE "id" = $1`,
        [id]
      );

      return editedBanner.rows[0];
    } catch (error) {
      console.error("Błąd podczas edycji baneru:", error);
      throw error;
    }
  },

  deleteBannerById: async (id) => {
    await db.query(`DELETE FROM banner WHERE "id" = $1`, [id]);

    console.log("Usunięto baner o id:", id);
    return true;
  },
};

// {
//   "title": "Więcej niż 20 lat doświadczenia",
//   "subtitle": "Założona w 1989, nasza firma to zespół doświadczonych pośredników i ekspertów nieruchomości zawsze gotowych by Ci pomóc.",
//   "image": "house_by_the_water.png",
//   "url": "#",
//   "active": 1
// }
