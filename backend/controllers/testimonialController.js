const Testimonial = require("../models/Testimonial");

module.exports = {
  getAll: async (req, res) => {
    const allTestimonial = await Testimonial.getAll();
    res.status(200).send(allTestimonial);
  },

  getById: async (req, res) => {
    const testimonial = await Testimonial.getById();
    res.status(200).send(testimonial);
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
};
