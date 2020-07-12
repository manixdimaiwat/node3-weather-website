const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


//app.com
app.get('',(req, res) => {
    res.render('index',{
        title : 'Weather App',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help',
        name: 'Andrew Mead',
        message: 'This is a help page.'
    })
})


app.get('/weather',(req, res) => {
    //const address = req.query.address
    if (!req.query.address){
        return res.send({
            error : 'No address provided.'
        })
    }
    
    // res.send({
    //     forecast: 'Sunny',
    //     location: 'Manila',
    //     address: req.query.address
    // })

    geocode(req.query.address,(error, {latitude, longitude, location} ={} ) => {
        if(error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            return res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
          })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.',
    })
 })

app.get('*', (req, res) => {
   res.render('404',{
       title: '404',
       name: 'Andrew Mead',
       errorMessage : 'Page not found.'
   })
})


app.listen(3000,() => {
    console.log('Server is up on port 3000.')
})