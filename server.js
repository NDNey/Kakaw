const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const { locales } = require('moment')
const MongoStore = require('connect-mongo')(session)

//load config

dotenv.config({path:'./config/config.env'})

//Passport config
require('./config/passport')(passport)
//database
connectDB()
const app = express()
//loging
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//session middleware
app.use(session({
    secret:'lolo bolon',
    resave: false,
    saveUninitialized:false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
    
}))
//passport middleware

app.use(passport.initialize())
app.use(passport.session())

//static
app.use(express.static(path.join(__dirname,'public')))
//routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))


const PORT = process.env.PORT || 8000

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
