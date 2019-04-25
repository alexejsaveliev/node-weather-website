const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000

const app = express()
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup hbs
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join( __dirname, '../public' )))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Alex'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Alex'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'loren',
        title: 'Help'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Article not found',
        name: 'Help'
    })
})

app.get('/weather', (req, res) => {

    const address = req.query.address

    if (!address) {
        return res.send({
            error: 'Address wasnt provided'
        })
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
    
            if (error) {
                return res.send({error})
            }
    
            // console.log(location)
            // console.log(forecastData)
            res.send({forecast: forecastData, location})
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Alex',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is runing on port ' + port);
})