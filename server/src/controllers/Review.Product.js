const { ReviewProducts, Product } = require("../db");

const postReviewProducts = async (
  title,
  description,
  userNameUserReview,
  score,
  idProductReview 
) => {
  const product = await Product.findByPk(idProductReview);
  if (!product) {
    throw Error("Product no found");
  }
  const newReview = await ReviewProducts.findOrCreate({
    where: { title, description, userNameUserReview, score },
  });
  await newReview[0].setReviewProducts(product);
  return newReview[0];
};

const getReviewProduct = async (id) => {
  const review = await ReviewProducts.findOne({
    where: { id },
    include: {
      model: Product,
      as: " reviewP",
    },
  });

  res.sen('Hola mundo review')
  if (review) return review;
  return { error: "no review found" };
};

const deleteReviewProduct = async (id) => {
  try {
    const review = await ReviewProducts.findByPk(id);
    if (!review) {
      return { error: "No reviews found" };
    }
    await review.destroy();
    return { error: "Review deleted successfully" };
  } catch (error) {
    res.status(500).json({ error: "Error de servidor" });
  }
};

module.exports = { deleteReviewProduct, getReviewProduct, postReviewProducts };
