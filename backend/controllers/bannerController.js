const Banner = require("../models/Banner");

module.exports = {
  getAllBanners: async (req, res) => {
    const allBanners = await Banner.getAllBanners();
    res.status(200).send(allBanners);
  },

  getBannerById: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).send("Missing ID");
      return;
    }

    try {
      const banner = await Banner.getBannerById(id);

      if (banner) {
        res.status(200).json(banner);
      } else {
        res.status(404).send(`Banner with ID ${id} not found`);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania adresu:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  addNewBanner: async (req, res) => {
    const body = req.body;
    if (
      !body.title ||
      !body.subtitle ||
      !body.image ||
      !body.url ||
      !body.active
    ) {
      res.status(400).send("Missing data");
      return 0;
    }

    console.log(body.title, body.subtitle, body.image, body.url, body.active);

    const banner = await Banner.addNewBanner(
      body.title,
      body.subtitle,
      body.image,
      body.url,
      body.active
    ).catch((e) => {
      console.log(e);
    });

    if (banner) {
      res.status(200).send("Banner added");
    } else {
      res.status(400).send("Error");
    }
  },

  editBannerById: async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    if (!id) {
      res.status(400).send("Missing ID");
      return;
    }

    if (
      !body.title ||
      !body.subtitle ||
      !body.image ||
      !body.url ||
      !body.active
    ) {
      res.status(400).send("Missing data");
      return;
    }

    try {
      const editedBanner = await Banner.editBannerById(
        id,
        body.title,
        body.subtitle,
        body.image,
        body.url,
        body.active
      );

      if (editedBanner) {
        res.status(200).json(editedBanner);
      } else {
        res.status(404).send(`Banner with ID ${id} not found`);
      }
    } catch (error) {
      console.error("Błąd podczas edycji adresu:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  deleteBannerById: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).send("Missing ID");
      return;
    }

    const success = await Banner.deleteBannerById(id).catch((e) => {
      console.log(e);
      return false;
    });

    if (success) {
      res.status(200).send("Banner deleted");
    } else {
      res.status(400).send("Error");
    }
  },
};
