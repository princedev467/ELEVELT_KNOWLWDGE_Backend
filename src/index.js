// const express = require('express');
// const bcrypt = require('bcrypt');
// const cookieParser=require('cookie-parser')
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger-output.json');

// //join frontend and backend
// const cors = require('cors')
// const router = express.Router()
// require('dotenv').config()

// const app = express();
// const routes = require('./routes/api/v1/index.routes');

// const mongodbConnnect = require('./db/MongoDb');
// const passport = require('passport');
// const {googleProvider,facebookProvider} = require('./service/provider');
// const connectSocket = require('./service/soketIO');


// console.log(process.env.PORT);

// // mongodbConnnect();

// app.use(express.json());
// // app.use(cookieParser());

// // app.use(express.urlencoded({extended:false}))
// // app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
// // app.use(passport.initialize());
// // app.use(passport.session());


// app.use('/public',express.static('public'))

// app.use(cors({
//     // origin: 'https://elevelt-knowlwdge-frontend.vercel.app',
//       origin: '  http://localhost:5173',
//     optionsSuccessStatus: 200,
//     credentials:true
// }))

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



// // Auth for google and facebook Authentication
// // googleProvider();
// // facebookProvider()

// // connectSocket();

// // http://localhost:2022/api/v1

// // app.use('/api/v1', routes);

// // app.get('/',(req,res)=>{
// //     res.send('welcomw to backend')
// // })
// app.listen(process.env.PORT, () => {
//     console.log(`this port started at ${process.env.PORT}`);

// })

require('dotenv').config()
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const mongodbConnnect = require('./db/MongoDb');

const routes = require('./routes/api/v1/index');

const app = express();




app.use(express.json());

app.use(express.urlencoded({extended:false}));

//join frontend and backend
const cors = require('cors')

app.use('/public',express.static('public'))

mongodbConnnect()

app.use(cors({
    origin: 'https://elevelt-knowlwdge-frontend.vercel.app',
    //   origin: '  http://localhost:5173',
    optionsSuccessStatus: 200,
    credentials:true
}))

// app.use(cors())



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1', routes);

// app.listen(process.env.PORT, () => {
//     console.log(`this port started at ${process.env.PORT}`);

// })

module.exports=app