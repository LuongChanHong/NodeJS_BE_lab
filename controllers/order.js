const Order = require("../models/Order");
const pdfkit = require("pdfkit");
const path = require("path");
const fs = require("fs");

exports.createOrder = (req, res, next) => {
  try {
    res.user
      .populate("cart.items.product")
      .then((user) => {
        const orderProducts = [];
        if (user) {
          user.cart.items.forEach((item) => {
            const newItems = { product: item.product, quantity: item.quantity };
            orderProducts.push(newItems);
          });
          const order = new Order({
            products: orderProducts,
            user: { name: user.name, userId: user._id },
          });
          order.save();
          user.cart.items = [];
          user.save();
        }
      })
      .catch((err) => console.log("err:", err));
  } catch (error) {
    return next(new Error(error));
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const orders = await Order.find();
    // const orders = [];
    // console.log("orders:", orders);
    if (orders.length <= 0) {
      res.statusMessage = "No Order Found";
      res.status(404).send("No Order Found");
    } else {
      res.send(orders);
    }
  } catch (error) {
    return next(new Error(error));
  }
};

const writeInvoiceContent = (file, products) => {
  let totalPrice = 0;
  file.fontSize(20).text("Invoice Detail:", { underline: true });
  products.forEach((item) => {
    file
      .fontSize(12)
      .text(
        `title: ${item.product.title}  quantity: ${item.quantity}  price: ${item.product.price} `
      );
    totalPrice += item.product.price * item.quantity;
  });
  file.fontSize(12).text(`---------------------------`);
  file.fontSize(20).text(`Total Price: ${totalPrice}`);
  return file;
};

exports.getInvoice = async (req, res, next) => {
  try {
    const orderId = req.query.id;
    // console.log("req.query.id:", req.query.id);
    const foundOrder = await Order.findById(orderId);
    // console.log("foundOrder:", foundOrder);
    if (!foundOrder) {
      return next(new Error("No order found"));
    }

    // console.log("foundOrder:", foundOrder.products);

    const invoiceName = "invoice-" + orderId + ".pdf";
    const invoicePath = path.join("./data/invoices/" + invoiceName);

    let pdfFile = new pdfkit();
    pdfFile.pipe(fs.createWriteStream(invoicePath));
    pdfFile.pipe(res);
    pdfFile = writeInvoiceContent(pdfFile, foundOrder.products);
    pdfFile.end();
    res.contentType("application/pdf");
    res.send(pdfFile);
  } catch (error) {
    return next(new Error(error));
  }
};
