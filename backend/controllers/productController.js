const fs = require("fs");
const path = require("path");

const getProducts = (req, res) => {
  const productsPath = path.join(__dirname, "../data/products.json");

  fs.readFile(productsPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading products file" });
    }
    const products = JSON.parse(data);
    res.json(products);
  });
};

module.exports = { getProducts };
