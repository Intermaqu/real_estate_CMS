const Category = require("../models/Category");

module.exports = {
  getAllCategories: async (req, res) => {
    const allCategories = await Category.getAllCategories();
    res.status(200).send(allCategories);
  },

  getCategoryById: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).send("Missing ID");
      return;
    }

    try {
      const category = await Category.getCategoryById(id);

      if (category) {
        res.status(200).json(category);
      } else {
        res.status(404).send(`category with ID ${id} not found`);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania kategorii:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  addNewCategory: async (req, res) => {
    const payload = req.body;
    if (
      !payload.name ||
      !payload.description ||
      !payload.image ||
      !payload.created_at ||
      payload.active === undefined
    ) {
      res.status(400).send("Missing data");
      return 0;
    }

    const category = await Category.addNewCategory(
      payload.name,
      payload.description,
      payload.image,
      payload.created_at,
      payload.active
    ).catch((e) => {
      console.log(e);
    });

    if (category) {
      res.status(200).send("Category added");
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

    const { name, description, image, active } = req.body;

    if (!name || !description || !image || active === undefined) {
      res.status(400).send("Missing data!");
      return 0;
    }

    created_at = new Date;

    const real_estate = await Category.editById(
      id,
      name,
      description,
      image,
      created_at,
      active
    ).catch((e) => {
      console.log(e);
    });

    if (real_estate) {
      res.status(200).send("Category edited");
    } else {
      res.status(400).send("Error");
    }
  },

  deleteCategoryById: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).send("Missing ID");
      return;
    }

    const success = await Category.deleteCategoryById(id).catch((e) => {
      console.log(e);
      return false;
    });

    if (success) {
      res.status(200).send("Category deleted");
    } else {
      res.status(400).send("Error");
    }
  },
};
