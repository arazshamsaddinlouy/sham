function getAllMenus(req, res) {
  const menus = require("../config/menu.json");
  return res.status(200).json({ menus: menus });
}
function getAllFooters(req, res) {
  const footers = require("../config/footer.json");
  return res.status(200).json({ footers: footers });
}
function getAllSellers(req, res) {
  const sellers = require("../config/sellers.json");
  return res.status(200).json({ sellers: sellers });
}
function getAllSales(req, res) {
  const sales = require("../config/sales.json");
  return res.status(200).json({ sales: sales });
}
function getAllTrades(req, res) {
  const trades = require("../config/trades.json");
  return res.status(200).json({ trades: trades });
}

module.exports = { getAllMenus, getAllFooters, getAllSellers, getAllSales, getAllTrades };
