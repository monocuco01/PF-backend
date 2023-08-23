const { Router } = require('express');
const {
  getAllProducts,
  getProductByIdHandler,
  createNewProduct,
  getProductsByCategory,
  sortProductsByPrice,
  sortProductsByName, 
  updateProductHandler
} = require('../handlers/productshandler');

const products = Router();

products.get('/', getAllProducts);
products.get('/:id', getProductByIdHandler);
products.post('/', createNewProduct); 
products.get('/filter/category/:categoryName', getProductsByCategory); 
products.get('/sort/price/:order', sortProductsByPrice);             
products.get('/sort/name/:order', sortProductsByName); 
products.get('/:id', updateProductHandler);

module.exports = products;
