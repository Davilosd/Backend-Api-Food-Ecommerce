const path = require('path')
const express = require('express')
const morgan = require('morgan')
const { engine } = require ('express-handlebars');
const methodOverride = require('method-override')
const bodyParser = require('body-parser');
const SortMiddleware = require('./app/middlewares/SortMiddleware')
const session = require('express-session');
const Handlebars = require('handlebars');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const helpers = require('handlebars-helpers')();
Handlebars.registerHelper(helpers);

const app = express()
const port = 3000

const route = require('./routes')

const api = require('./api')
const db = require('./config/db')




// connect to db
db.connect()


app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

app.use(methodOverride('_method'))

//custom middleware
app.use(SortMiddleware)
// HTTP logger
app.use(morgan('combined'))

// Template engine
app.engine('hbs', engine({
  extname: '.hbs',
  helpers: {
    sum: (a, b) => a + b,
    sortable: (field, sort) => {
      const icons = {
        default: 'arrow-down-outline',
        asc: 'arrow-down-outline',                          
        desc: 'arrow-up-outline',
      }
      const types = {
        default: 'asc',
        asc: 'desc',                          
        desc: 'asc',
      }
      const icon = icons[sort.type]
      const type = types[sort.type]
      return `<a href="?_sort&column=${sort.column}&type=${type}"><ion-icon name="${type}"></ion-icon></a>`
    },
     
  }
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources','views'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
  secret: 'weblesson',
  resave: true,
  saveUninitialized: true
}))



// api innit
api(app)


// routes innit
route(app);

// 127.0.0.1 - localhost
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})




