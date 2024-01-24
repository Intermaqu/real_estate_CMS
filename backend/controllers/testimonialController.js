const Testimonial = require("../models/Testimonial");

module.exports = {
  getAllTestimonial: async (req, res) => {
    const allTestimonial = await Testimonial.getAllTestimonials();
    res.status(200).send(allTestimonial);
  },

  addNewTestimonial: async (req, res) => {
    const body = req.body;
    if (
        !body.full_name || 
        !body.position || 
        !body.comment || 
        !body.created_at || 
        body.active === undefined
    ) {
      res.status(400).send("Missing data");
      return 0;
    }

    res.status(200).send("Category added");
  },
};
