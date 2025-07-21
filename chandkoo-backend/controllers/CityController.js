function getAllCities(req, res) {
  const id = req.query.id;
  if (!id) {
    res.status(400).json({ message: "استان مورد نظر را انتخاب نمایید" });
  }
  const cities = require("../config/cities.json");
  const provinceCities = cities.filter((el) => el.province_id == id);
  return res.status(200).json({ cities: provinceCities });
}

module.exports = { getAllCities };
