const express = require("express")
const ProductRouter = express.Router();

ProductRouter.get('/', getAllProduct)
ProductRouter.get('/detail/:id', getProductById)
ProductRouter.get('/pagination/:page', getProductByPage)
ProductRouter.get('/', getAllProduct)

ProductRouter.post('/create', addProduct)
ProductRouter.put('/update', updateProduct)
ProductRouter.delete('/delete/:id', deleteProduct)

module.exports = ProductRouter;

