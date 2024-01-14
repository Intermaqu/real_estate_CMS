const db = require("../db/config");

module.exports = {
  getAllCategories: async (req, res) => {
    let categories = await db.query("SELECT * FROM category");
    return categories.rows;
  },

  getCategoryById: async (id) => {
    let category = await db.query(`SELECT * FROM category WHERE "id" = $1`, [
      id,
    ]);
    return category.rows[0];
  },

  addNewCategory: async (name, description, image, created_at, active) => {
    let category = await db.query(
      `INSERT INTO category ("name", "description", "image", "created_at", "active") VALUES ($1, $2, $3, $4, $5)`,
      [name, description, image, created_at, active]
    );

    return category;
  },

  editCategoryById: async (
    id,
    name,
    description,
    image,
    created_at,
    active
  ) => {
    try {
      const result = await db.query(
        `UPDATE category 
         SET 
           "name" = $2,
           "description" = $3,
           "image" = $4,
           "created_at" = $5,
           "active" = $6
         WHERE "id" = $1`,
        [id, name, description, image, created_at, active]
      );

      if (result.rowCount === 0) {
        console.log(`Nie znaleziono kategorii o id: ${id}`);
        return null;
      }

      console.log(`Zaktualizowano kategorii o id: ${id}`);

      let editedCategory = await db.query(
        `SELECT * FROM category WHERE "id" = $1`,
        [id]
      );

      return editedCategory.rows[0];
    } catch (error) {
      console.error("Błąd podczas edycji kategorii:", error);
      throw error;
    }
  },

  deleteCategoryById: async (id) => {
    await db.query(`DELETE FROM category WHERE "id" = $1`, [id]);

    console.log("Usunięto kategorię o id:", id);
    return true;
  },
};

// {
//   "name": "Mieszkanie",
//   "description": "Nieruchomość składająca się z jednego lub więcej pokoi, kuchni, łazienki i innych pomieszczeń mieszkalnych.",
//   "image": "https://example.com/images/apartment.jpg",
//   "created_at": "2022-01-12T15:45:00Z",
//   "active": false
// }
