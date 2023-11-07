require('dotenv').config()
require('express-async-errors')
//express
const express= require('express')
const app= express()
const { config } = require("./config/global.config");

//Rest of packages
const morgan= require('morgan')
const cookieParser= require('cookie-parser')
const rateLimiter= require('express-rate-limit')
const helmet= require('helmet')
const xss= require('xss-clean')
const cors= require('cors')
const mongoSanitize= require('express-mongo-sanitize')

//Database
const connectDB=  require('./db/connect')

//Routes
const { authRouter } = require("./routes/authRoutes");
const { adminRouter } = require("./routes/adminRoutes");
const { superAdminRouter } = require("./routes/superAdminRoutes");
const { studentRouter } = require("./routes/studentRoutes");

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
app.use(cookieParser(process.env.JWT_SECRET))

// Load API routes
app.get("/", (req, res) => res.send("API is up and running"));
app.get("/api/v1", (req, res) => {
    console.log(req.signedCookies)
    res.send("Student-Registration Portal API V1, [Health check::: API up and running]")
})

app.use(`${config.api.prefix}/auth`, authRouter)
app.use(`${config.api.prefix}/admin`, adminRouter)
app.use(`${config.api.prefix}/super-admin`, superAdminRouter)
app.use(`${config.api.prefix}/student`, studentRouter)


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port= process.env.PORT || 5000

const start= async()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`Listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}
start()
