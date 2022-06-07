const sequelize = require('../db');
const {DataTypes} = require('sequelize');
//Описание таблиц
const User = sequelize.define('user', {
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
   email: {type: DataTypes.STRING, unique: true},
   login: {type: DataTypes.STRING, unique: true},
   password: {type: DataTypes.STRING},
   role: {type: DataTypes.STRING, defaultValue: 'USER'}, 
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
 })

 const Basket_product = sequelize.define('basket_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
 })

const Product = sequelize.define('product', {
   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
   name: {type: DataTypes.STRING, unique: true, allowNull: false},
   price: {type: DataTypes.INTEGER, allowNull: false},
   weight: {type: DataTypes.INTEGER, defaultValue: '0'},
   img: {type: DataTypes.STRING, allowNull: false},
   quanity: {type: DataTypes.INTEGER, defaultValue: '0'},
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
 })

 const ProductInfo = sequelize.define('product_info', {
     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
     title: {type: DataTypes.STRING, allowNull: false},
 })
//Описание связей таблиц
User.hasOne(Basket);
Basket.belongsTo(User);

Basket.hasMany(Basket_product);
Basket_product.belongsTo(Basket);

Product.hasMany(Basket_product);
Basket_product.belongsTo(Product);

Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasMany(ProductInfo, {as: 'info'});
ProductInfo.belongsTo(Product);

module.exports = {
    User,
    Basket,
    Basket_product,
    Product,
    Category,
    ProductInfo
}