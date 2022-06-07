const uuid = require('uuid');
const path = require('path');
const {Product, ProductInfo} = require('../models/models');
const ApiError = require('../error/ApiError');

class ProductController {
    async create(req, res, next){
        try{
        let {name, price, categoryId, quanity, info} = req.body;
        const {img} = req.files;
        const fileName = uuid.v4() + '.jpg';
        img.mv(path.resolve(__dirname, '..', 'static', fileName));
        const product = await Product.create({name, price, categoryId, quanity,img: fileName});
        
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

    async getAll(req, res){
        const {categoryId} =  req.query;
        let products;
        if(!categoryId){
            products = await Product.findAndCountAll()
        } else {
            products = await Product.findAndCountAll({where: categoryId});
        }
        return res.json(products);
    }

    async getOne(req, res){
       const {id} = req.params;
       const product = await Product.findOne(
        {
            where: {id},
            include: [{model: ProductInfo, as: 'info'}]
        },
       )
        return res.json(product); 
    }
}

module.exports = new ProductController();