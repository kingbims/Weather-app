const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;

//Define path to Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials');


//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Moremi Morakinyo'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Moremi Morakinyo'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        text: 'This is a helpful text.',
        title: 'Help',
        name: 'Moremi Morakinyo'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        res.send({
            error: 'Please provide an address.'
        })
    } else {
        geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
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
    }

});


app.get('/help/*', (req, res) => {
    res.render('404', {
        msg: 'Help article not found',
        title: '404',
        name: 'Moremi Morakinyo'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        msg: 'Page not found',
        title: '404',
        name: 'Moremi Morakinyo'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});