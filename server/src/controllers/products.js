const { Product, Category } = require('../db');

const getAllProductsFromDB = async () => {
  try {
    const productsDb = await Product.findAll({
      include: Category,
    });

    return productsDb.map((prod) => ({
      id: prod.id,
      title: prod.title,
      price: prod.price,
      description: prod.description,
      image: prod.image,
      rating: prod.rating,
      isActive: prod.isActive,
      categories: prod.Categories.map((category) => category.name),
    }));
  } catch (error) {
    console.error("Error retrieving products from DB:", error);
    throw error;
  }
};

const getProducts = async (title) => {
  try {
    const productsFromDB = await getAllProductsFromDB();

    const allProducts = [...productsFromDB];

    if (title) {
      const filteredProducts = allProducts.filter(
        (product) => product.title.toLowerCase().includes(title.toLowerCase())
      );
      return filteredProducts.slice(0, 15);
    }

    return allProducts;
  } catch (error) {
    console.error("Error retrieving products:", error);
    throw error;
  }
};

const getProductByIdFromDB = async (id) => {
  try {
    const productDB = await Product.findByPk(id, {
      include: Category,
    });

    if (productDB) {
      return {
        id: productDB.id,
        title: productDB.title,
        price: productDB.price,
        description: productDB.description,
        image: productDB.image,
        rating: productDB.rating,
        isActive: productDB.isActive,
        categories: productDB.Categories.map((category) => category.name),
      };
    }

    return null;
  } catch (error) {
    console.error("Error retrieving product from DB:", error);
    return null;
  }
};

const getProductById = async (id) => {
  return getProductByIdFromDB(id);
};

const createProduct = async (productData) => {
  try {
    const { categories, ...rest } = productData;

    let product;

    console.log('Creando producto con datos:', rest);
    product = await Product.create(rest);

    if (categories && categories.length > 0) {
      const categoryInstances = await Category.findAll({
        where: {
          name: categories,
        },
      });

      await product.setCategories(categoryInstances);
      console.log('Relación con categorías establecida:', categoryInstances);
    }

    product = await Product.findByPk(product.id, {
      include: Category,
    });
    console.log('Producto con categorías:', product);

    return product;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

const getProductsByTitleFromDB = async (title) => {
  try {
    const productsDb = await Product.findAll({
      include: Category,
      where: {
        title: {
          [Sequelize.Op.iLike]: `%${title}%`,
        },
      },
    });

    return productsDb.map((prod) => ({
      id: prod.id,
      title: prod.title,
      price: prod.price,
      description: prod.description,
      image: prod.image,
      rating: prod.rating,
      isActive: prod.isActive,
      categories: prod.Categories.map((category) => category.name),
    }));
  } catch (error) {
    console.error("Error retrieving products from DB:", error);
    throw error;
  }
};

const getProductsByTitle = async (title) => {
  const productsFromDB = await getProductsByTitleFromDB(title);

  const allProducts = [...productsFromDB];
  return allProducts.slice(0, 15);
};

const filterProductsByCategoryFromDB = async (categoryName) => {
  try {
    const category = await Category.findOne({
      where: { name: categoryName },
      include: Product,
    });

    if (!category) {
      return [];
    }

    return category.Products.map((prod) => ({
      id: prod.id,
      title: prod.title,
      price: prod.price,
      description: prod.description,
      image: prod.image,
      rating: prod.rating,
      isActive: prod.isActive,
      categories: category.name,
    }));
  } catch (error) {
    console.error("Error retrieving products from DB:", error);
    throw error;
  }
};

const filterProductsByCategory = async (categoryName) => {
  const productsFromDB = await filterProductsByCategoryFromDB(categoryName);

  const allProducts = [...productsFromDB];
  return allProducts.slice(0, 15);
};

const sortProductsByPriceFromDB = async (order) => {
  try {
    const sortOrder = order === 'asc' ? 'ASC' : 'DESC';

    const products = await Product.findAll({
      include: Category,
      order: [['price', sortOrder]],
    });

    return products.map((prod) => ({
      id: prod.id,
      title: prod.title,
      price: prod.price,
      description: prod.description,
      image: prod.image,
      rating: prod.rating,
      isActive: prod.isActive,
      categories: prod.Categories.map((category) => category.name),
    }));
  } catch (error) {
    console.error("Error retrieving products from DB:", error);
    throw error;
  }
};

const sortProductsByNameFromDB = async (order) => {
  try {
    const sortOrder = order === 'asc' ? 'ASC' : 'DESC';

    const products = await Product.findAll({
      include: Category,
      order: [['title', sortOrder]],
    });

    return products.map((prod) => ({
      id: prod.id,
      title: prod.title,
      price: prod.price,
      description: prod.description,
      image: prod.image,
      rating: prod.rating,
      isActive: prod.isActive,
      categories: prod.Categories.map((category) => category.name),
    }));
  } catch (error) {
    console.error("Error retrieving products from DB:", error);
    throw error;
  }
};

module.exports = {
  getProducts,
  getProductById,
  getProductsByTitle,
  createProduct,
  filterProductsByCategory,
  sortProductsByPriceFromDB,
  sortProductsByNameFromDB,
};
