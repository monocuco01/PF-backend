const { Router } = require("express");

// Importación de rutas
const categories = require("./categories");
const products = require("./products");
const paymenrouter = require("./payments.routes"); // Cambio en la importación
/*const filtercategorie2 = require("./filtercategories");*/
const reviewProductRouter =require("./review.Product.Routes")
const router = Router();

router.use("/categories", categories);
router.use("/products", products);
router.use("/", paymenrouter); // Cambio en la ruta
/*router.use("/filter", filtercategorie2);*/
router.use('/review', reviewProductRouter)

module.exports = router;
