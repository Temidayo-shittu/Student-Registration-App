require('dotenv').config()
require('express-async-errors')
//express
const express = require('express')
const app = express()

const fileUpload = require('express-fileupload')

//USE V2 FOR CLOUDINARY
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const { config } = require("./config/global.config");


//Rest of packages
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const multer = require('multer')
const rateLimiter = require('express-rate-limit')
const helmet = require('helmet')
const xss = require('xss-clean')
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize')

//Database
const connectDB =  require('./db/connect')

//Routes
const { authRouter } = require("./routes/authRoutes");
const { adminRouter } = require("./routes/adminRoutes");
const { superAdminRouter } = require("./routes/superAdminRoutes");
const { studentRouter } = require("./routes/studentRoutes");
const { studentPhotoRouter } = require("./routes/studentPhotoRoutes");
const { analyticsRouter } = require("./routes/analyticsRoutes");

//Middleware
const notFoundMiddleware= require('./middleware/not-found')
const errorHandlerMiddleware= require('./middleware/error-handler')


app.use(morgan('tiny'))
app.set('trust proxy',1)
app.use(rateLimiter({
    windowsMs: 15 * 60 * 1000,
    max:60
}))
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(mongoSanitize())

app.use(express.json())
app.use(fileUpload({ 
    useTempFiles: true,
    tempFileDir: '/tmp', 
}))
//app.use(cookieParser(process.env.JWT_SECRET))

// Load API routes
app.get("/", (req, res) => res.send("API is up and running"));
app.get("/api/v1", (req, res) => {
    console.log(req.signedCookies)
    res.json({
        message:"Student-Registration Portal API V1, [Health check::: API up and running]",
        postmanLink: "https://elements.getpostman.com/redirect?entityId=26636754-1a805b8c-845a-4776-a9fd-1ca256404349&entityType=collection"
    })
})

app.use(`${config.api.prefix}/auth`, authRouter)
app.use(`${config.api.prefix}/admin`, adminRouter)
app.use(`${config.api.prefix}/super-admin`, superAdminRouter)
app.use(`${config.api.prefix}/student`, studentRouter)
app.use(`${config.api.prefix}/images`, studentPhotoRouter)
app.use(`${config.api.prefix}/analytics`, analyticsRouter)


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`Listening on port ${port}`))
    } catch (error) {app.listen(port, console.log(`Listening on port ${port}`))
        console.log(error)
    }
}
start()
