const express = require("express")
const {
  createOrder,
  GetAllOrder,
  DeleteOrder,
  ShippingProduct,
  GetAllOrderPendding,
  GetAllOrderShipping,
  GetAllOrderPaid,
  PaidProduct,
  GetOrderPenddingByUser,
  GetOrderShippingByUser,
  GetOrderPaidByUser,
  GetAllOrderInAMonth,
  GetAllOrderPaypal,
  GetOrderPaypalByUser,
  updateOrder,
  PrintOrderGhn,
  clientCancelOrder,
} = require("../controllers/OrderController.js")
const { isAuthenticated, isAdmin } = require("../utils/util.js")

const OrderRouter = express.Router();

OrderRouter.post("/create", createOrder);
OrderRouter.post("/update/:id", updateOrder);
OrderRouter.post("/cancel/:id", clientCancelOrder);
OrderRouter.get("/print/:id", PrintOrderGhn);
OrderRouter.put("/shipping/:id", ShippingProduct);
OrderRouter.put("/paid/:id", PaidProduct);
OrderRouter.delete('/delete/:id', DeleteOrder)

OrderRouter.get("/", GetAllOrder);
OrderRouter.get("/orderPaypal", GetAllOrderPaypal);
OrderRouter.get("/orderPendding", GetAllOrderPendding);
OrderRouter.get("/orderShipping", GetAllOrderShipping);
OrderRouter.get("/orderPaid", GetAllOrderPaid);

OrderRouter.get("/allOrderInAMonth", GetAllOrderInAMonth);

// --- user
OrderRouter.get("/:id", GetAllOrder);
OrderRouter.get("/orderPaypal/:id", GetOrderPaypalByUser);
OrderRouter.get("/orderPendding/:id", GetOrderPenddingByUser);
OrderRouter.get("/orderShipping/:id", GetOrderShippingByUser);
OrderRouter.get("/orderpaid/:id", GetOrderPaidByUser);

module.exports = OrderRouter;