const Testimonial = require("../models/Testimonial");

module.exports = {
  getAll: async (req, res) => {
    const allTestimonial = await Testimonial.getAll();
    res.status(200).send(allTestimonial);
  },

  getById: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).send("Missing ID");
      return;
    }

    try {
      const testimonial = await Testimonial.getById(id);

      if (testimonial) {
        res.status(200).json(testimonial);
      } else {
        res.status(404).send(`Testimonial with ID ${id} not found`);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania oferty nieruchomości:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  add: async (req, res) => {
    const { full_name, position, comment, created_at, active } = req.body;
    if (
      !full_name ||
      !position ||
      !comment ||
      !created_at ||
      active === undefined
    ) {
      res.status(400).send("Missing data");
      return 0;
    }

    const testimonial = await Testimonial.add(
      full_name,
      position,
      comment,
      created_at,
      active
    ).catch((e) => {
      console.log(e);
    });

    if (testimonial) {
      res.status(200).send("Testimonial added");
    } else {
      res.status(400).send("Error");
    }
  },

  editById: async (req, res) => {
    const { id } = req.params;
    const { full_name, position, comment, created_at, active } = req.body;
    if (
      !id ||
      !full_name ||
      !position ||
      !comment ||
      !created_at ||
      active === undefined
    ) {
      res.status(400).send("Missing data");
      return 0;
    }

    const testimonial = await Testimonial.edit(
      id,
      full_name,
      position,
      comment,
      created_at,
      active
    ).catch((e) => {
      console.log(e);
    });

    if (testimonial) {
      res.status(200).send("Testimonial edited");
    } else {
      res.status(400).send("Error");
    }
  },
};
