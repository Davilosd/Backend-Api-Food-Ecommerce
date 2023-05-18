const newsRouter = require('./news')
const meRouter = require('./me')
const coursesRouter = require('./courses')

const siteRouter = require('./site')
const accountRouter = require('./account')
const learnRouter = require('./learn')
 
function route(app) {
    app.get('/news', (req, res) => {
        res.render('news')
    })
    app.use('/news', newsRouter)
    app.use('/me', meRouter)
    app.use('/account', accountRouter)
    app.use('/courses', coursesRouter)
    app.use('/learn', learnRouter)
    app.use('/', siteRouter)
    app.get('/', (req, res) => {
        res.render('home')
      })


    app.get('/search', (req, res) =>{
        res.render('search')
    })
    app.post('/search', (req, res) =>{
        res.send('')
    })
    app.use(function(req, res, next) {
        res.locals.email = req.session.email;
        res.locals.role = req.session.role;
        next();
      });

    // app.post('/p_login', (req,res)=>{
    //     res.render('search');
    // })
}

function setup() {
    createCanvas(400,400)
}

module.exports = route