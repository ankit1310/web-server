const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express configs
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')

// Setup handlebar and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

// Set static directory for server
app.use(express.static(publicDirectoryPath))

// app.com
// app.get('', (req, res) => {
//     res.send('Hello Express!')
//     //res.send('<h1>Weather</h1>')
// })

// Challenge 2: Create 2 more html files
// 1. Create html page for about with 'About' title
// 2. Create html page for help with 'Help' title
// 3. Remove the old route handlers for both
// 4. Visit both in browser and test

// app.com/help
// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Ankit',
//         age: 28
//     },
//     {
//         name: 'Manisha',
//         age: 26
//     }])
// })

// app.com/about
// app.get('/about', (req, res) => {
//     res.send('Hello Express! Welcome to about.')
//     res.send('<h1>About</h1>')
// })

// Customizes the server
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ankit'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about',
        name: 'Ankit'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ankit',
        message: 'This is Help from semi-dynamic page'
    })
})

// app.com/weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a location'
        })
    }

    // console.log(req.query.address)
    // res.send({
    //     forecast: 'Sun shall shine so shall sun set',
    //     location: 'Vancouver',
    //     address: req.query.address
    // })

    const valueProvidedByTheUser = req.query.address
    // console.log(valueProvidedByTheUser)
    geocode(valueProvidedByTheUser, (error, { latitude, longitude } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        
        forecast(latitude, longitude, (forecastError, { weather_descriptions, currentTemperature, feelslike } = {}) => {
            if (forecastError) {
                return res.send({
                    error: forecastError
                })
            }

            res.send({
                forecast: weather_descriptions + '. It is currently ' + currentTemperature +
                    ' degrees out. It feels like ' + feelslike + ' degrees out.',
                location: valueProvidedByTheUser,
                address: valueProvidedByTheUser
            })
        })
    })

    // res.send({
    //     forecast: 'Ankit',
    //     latitude: 28,
    //     longitude: 12.5676,
    //     location: 'Vancouver'
    // })
})

app.get('/products', (req, res) => {
    // if (req.query.search) {
    //     return res.send({
    //         error: 'You must provide a search term'
    //     })
    // }

    // console.log(req.query)
    // res.send({
    //     products: []
    // })

    if (req.query.search) {
        console.log(req.query)
        res.send({
            products: []
        })
    } else {
        res.send({
            error: 'You must provide a search term'
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'Human',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Not found',
        name: 'Human',
        message: 'Page not found'
    })
})

// TODO check why 'nodemon' is not working
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
