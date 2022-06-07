require('dotenv').config();
const express = require('express');
const models = require('./models/models')
const sequelize = require('./db');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');


const PORT = process.env.PORT;

const app = express();
app.use(cors({
    origin: '*',
    credentials: true,
}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}))
app.use('/api', router);


//обработка ошибки
app.use(errorHandler);

const start = async () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync(); 
        app.listen(PORT, () => (console.log(`Server started on ${PORT} port`)));
    } catch (err){
        console.log(err);
    }
}

start();