const {Basket, User} = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');
const {Product, ProductInfo} = require('../models/models');

class BasketController {
    async create(req, res, next){
        try{
        let {name, price, categoryId, quanity, info} = req.body;
        const {img} = req.files;
        const fileName = uuid.v4() + '.jpg';
        img.mv(path.resolve(__dirname, '..', 'static', fileName));
        let orderList = [{
            id: Basket.id,
            userID: User.id,
            email: User.email,
            orderItems: [{
                name: product.name,
                price: product.price,
                categoryId: product.categoryId,
                quanity: quanity,
                info: info
            }]
        }]
        const productOrder = await Product.create({name, price, categoryId, quanity,img: fileName});
        
        if(info){
            info = JSON.parse(info);
            info.forEach(i => {
                ProductInfo.create({
                    title: i.title,
                    description: i.description,
                    productId: product.id,
                })
            });
        }
        return res.json(product);
        } catch(err){
            next(ApiError.badRequest(err.message));
        }
    }
}

module.exports = new BasketController();