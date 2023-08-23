const { Router } = require("express");
const {ReviewProducts, Product} = require('../db')
const reviewProductRouter = Router();
const {
  deleteReviewProduct,
  getReviewProduct,
  postReviewProducts,
} = require("../controllers/Review.Product");

reviewProductRouter.post("/:idProductReview", async (req, res) => {
  const { title, description, UserNameUserReview, score } = req.body;
  const { idProductReview } = req.params;

  try {
    if (!title || !description || !UserNameUserReview || !score) {
      throw new Error("I'm sorry, I didn't receive complete information");
    } else {
      const product = await postReviewProducts(idProductReview );

      if (!product) {
        throw new Error("Product not found");
      }

      const newReview = await ReviewProducts.create({
        type: title,
        description,
        UserNameUserReview,
        score,
      });

      await newReview.setReviewP(product); // Usa el alias que has definido en tus relaciones

      res.status(200).json(newReview);
    }
  } catch (error) {
    return res.status(404).send(error.message);
  }
});



reviewProductRouter.get("/", async (req, res) => {
    // const {id} = req.params;
    const review = await getReviewProduct();
    try {

      res.send('hola')
         res.status(200).json(review);
        
    } catch (error) {
        return res.status(200).send(error.message);
    }
});

reviewProductRouter.delete("/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const deleteReview= await deleteReviewProduct(id);
    res.status(200).json(deleteReview);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while deleting the review" })
    }
})

module.exports = reviewProductRouter;