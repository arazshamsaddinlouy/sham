function getAllProvinces(req, res) {
  const provinces = require("../config/provinces.json");
  return res.status(200).json(provinces);
}

function getAllProvincesWithCities(req, res) {
  const provinces = require("../config/provinces.json");
  const cities = require("../config/cities.json");
  return res.status(200).json([...provinces, ...cities]);
}

module.exports = { getAllProvinces, getAllProvincesWithCities };
