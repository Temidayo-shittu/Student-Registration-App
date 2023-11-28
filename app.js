require('dotenv').config();
require('express-async-errors');

//express
const express = require('express');
const app = express();

const fileUpload = require('express-fileupload');
const { cloudinaryConfig } = require("./config/cloudinary.config");
const { config } = require("./config/global.config");

//Rest of packages
const morgan = require('morgan');
const bodyParser = require('body-parser');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

//Database
const connectDB =  require('./db/connect');

//Routes
const { analyticsRouter } = require("./routes/analyticsRoutes");
const { adminRouter } = require("./routes/adminRoutes");
const { authRouter } = require("./routes/authRoutes");
const { blackListedTokenRouter } = require("./routes/blacklistedTokenRoutes");
const { studentRouter } = require("./routes/studentRoutes");
const { studentPhotoRouter } = require("./routes/studentPhotoRoutes");
const { superAdminRouter } = require("./routes/superAdminRoutes");


//Middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


app.set('trust proxy',1);

app.use(rateLimiter({
    windowsMs: 15 * 60 * 1000,
    max:60
}));

app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
cloudinaryConfig(); 

app.use(fileUpload({ 
    useTempFiles: true,
    tempFileDir: "/tmp", 
}));


// Load API routes
app.get("/", (req, res) => res.send("API is up and running"));
app.get("/api/v1", (req, res) => {
    res.json({
        message:"Student-Registration Portal API, [Health check::: API up and running]",
        postmanLink: "https://www.postman.com/galactic-resonance-793427/workspace/babban-gona-hackathon/collection/26636754-1a805b8c-845a-4776-a9fd-1ca256404349?action=share&creator=26636754"
    })
});


app.use(`${config.api.prefix}/admin`, adminRouter);
app.use(`${config.api.prefix}/analytics`, analyticsRouter);
app.use(`${config.api.prefix}/auth`, authRouter);
app.use(`${config.api.prefix}/blacklisted-token`, blackListedTokenRouter);
app.use(`${config.api.prefix}/student`, studentRouter);
app.use(`${config.api.prefix}/images`, studentPhotoRouter);
app.use(`${config.api.prefix}/super-admin`, superAdminRouter);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, console.log(`Listening on port ${port}`));
    } catch (error) {
        app.listen(port, console.log(`Listening on port ${port}`));
        console.log(error);
    };
};

start();
