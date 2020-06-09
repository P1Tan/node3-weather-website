const   path                         = require('path')
const   express                      = require('express')
const   hbs                          = require('hbs')
const   geocode                      = require('./utils/geocode')
const   forecast                     = require('./utils/forecast')
const   publicDirectoryPath          = path.join(__dirname, '../public')
const   viewsPath                    = path.join(__dirname, '../templates/views')
const   partialsPath                 = path.join(__dirname, '../templates/partials')
const   app                          = express()


console.log(__dirname)
console.log(path.join(__dirname, '../public'))

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Crezyman'
    })
})
app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Crezyman'
    })
})
app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help Page',
        helpText: 'Help?',
        name: 'Crezyman'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Crezyman',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title:'404',
        name: 'Crezyman',
        errorMessage: 'Page not found'
    })
})


app.listen(3000, () => {
    console.log('Server is up and running on port 3000')
})