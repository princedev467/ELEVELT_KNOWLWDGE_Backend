
require('dotenv').config()
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const mongodbConnnect = require('./db/MongoDb');
const bcrypt = require('bcrypt');
const passport = require('passport');
const cookieParser=require('cookie-parser')
const routes = require('./routes/api/v1/index');
const cors = require('cors')



app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.use('/public',express.static('public'))

app.use(express.urlencoded({extended:false}))
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
 app.use(passport.initialize());
app.use(passport.session());

mongodbConnnect()

app.use(cookieParser());

app.use(cors({
    origin: 'https://elevelt-knowlwdge-frontend.vercel.app',
    //   origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
    credentials:true
}))


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1', routes);


// app.listen(process.env.PORT, () => {
//     console.log(`this port started at ${process.env.PORT}`);

// })

module.exports=app