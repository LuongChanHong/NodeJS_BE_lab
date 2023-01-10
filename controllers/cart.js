exports.addToCart = async (req, res, next) => {
  try {
    const product = req.body;
    // console.log("product:", product);
    req.user
      .addToCart(product)
      .then(() => {
        res.end();
      })
      .catch((err) => console.log("err:", err));
  } catch (error) {
    return next(new Error(error));
  }
};

exports.getCartItem = async (req, res, next) => {
  try {
    req.user
      .populate("cart.items.product")
      .then((user) => {
        if (user) {
          // console.log("user.cart.items:", user.cart.items);
          res.send(user.cart.items);
        } else {
          res.statusMessage = "cart is empty";
          res.status(404).end();
        }
      })
      .catch((err) => console.log("err:", err));
  } catch (error) {
    return next(new Error(error));
  }
};

// exports.deleteCartItem = (req, res) => {
//   const productsID = req.body.id;
//   // console.log("productsID:", productsID);
//   req.user
//     .getCart()
//     .then((cart) => {
//       return cart.getProducts({ where: { id: productsID } });
//     })
//     .then((products) => {
//       let product = products[0];
//       product.cartItem.destroy();
//     })
//     .catch((err) => console.log("err:", err));
// };
