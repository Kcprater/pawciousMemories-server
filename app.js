require('dotenv').config();

global.appRoot = __dirname;

//express
const express = require('express');
const app = express();
const router = express.Router();

//controllers
const user = require('./controllers/usercontroller');
const petInfo = require('./controllers/petinfocontroller');
const memory = require('./controllers/memorycontroller');
const gallery = require('./controllers/photogallerycontroller');

//db import & sync
const sequelize = require('./db');
sequelize.sync();
app.use(express.json());

//middleware
app.use(require('./middleware/headers'));

//routes
app.use('/user', user);
app.use(require('./middleware/validatesession'));
app.use('/petinfo', petInfo);
app.use('/memories', memory);
app.use('/gallery', gallery);

app.listen(process.env.PORT, () => console.log(`app is listening ${process.env.PORT}`));

module.exports = router;