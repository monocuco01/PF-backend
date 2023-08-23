require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require("fs");
const path = require("path");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_RENDER } = process.env;




//Con este trabajan desde su maquina
       const sequelize = new Sequelize(
           `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
           {
             logging: false,
             native: false,
           }
         );



 /* //Con esta cuando ya este deployada
   console.log(DB_RENDER);
   const sequelize = new Sequelize(DB_RENDER, {
         logging: false,
         dialect: 'postgres',
         dialectOptions: {
           ssl: {
            require: true,
             rejectUnauthorized: false 
           }
         }
       });*/


const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

//los models

const {
    Category,
    Product,
    ReviewProducts,
  } = sequelize.models;


  //Relaciones

  Product.belongsToMany(Category, { through: 'ProductCategory', timestamps : false });
  Category.belongsToMany(Product, { through: 'ProductCategory', timestamps : false });

  //Relacions de 1 a n entre Review y Products

  Product.hasMany(ReviewProducts, { foreignKey: 'idProductReview' }); 
  ReviewProducts.belongsTo(Product, { foreignKey: 'idProductReview' }); 
  

 module.exports = {
    ...sequelize.models,
    conn: sequelize,
  };