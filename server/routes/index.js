const Router = require('express');
const router = new Router();
const basketRouter = require('./basketRouter');
const categoryRouter = require('./categoryRouter');
const productRouter = require('./productRouter');
const userRouter = require('./userRouter');



router.use('/user', userRouter);
router.use('/basket', basketRouter);
router.use('/category', categoryRouter);
router.use('/product', productRouter);




module.exports = router;