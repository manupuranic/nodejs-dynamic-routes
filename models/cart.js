const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, prodPrice) {
    // Fetch previous cart.json
    fs.readFile(p, (err, data) => {
      let cart = { product: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(data);
      }
      // check if already present.
      const existingProductIndex = cart.product.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.product[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        console.log(existingProduct);
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.product[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.product = [...cart.product, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +prodPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
};
