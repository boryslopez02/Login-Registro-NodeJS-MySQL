const express = require('express')
const morgan = require('morgan')
const path = require('path')
const hbs = require('express-handlebars')

// Initialitations
const app = express()


// Settings
app.set('port', process.env.PORT || 4000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', hbs({
    defaultLayout: 'main',  
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs')

// Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())


// Globals Variables
app.use((req, res, next) => {
    next()
})

// Routes
app.use(require('./routes/'))
app.use(require('./routes/authentication'))
app.use(require('./routes/links')) // links

// Public
app.use(express.static(path.join(__dirname, 'public')))

// Starting the server
app.listen(app.get('port'), () => {
    console.log("server on port", app.get('port'));
})