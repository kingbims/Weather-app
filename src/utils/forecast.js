const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7a707b25435ad6c21ca5a2e616bf196f&query=' + latitude + ',' + longitude;

    request({ url, json: true }, (error, { body }) => {
    if (error) {
        callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
        callback('Unable to find location');
    } else {
        callback(undefined, body.current.weather_descriptions + '. ' + 'It is currently ' + body.current.temperature + ' degrees out. There is a ' + body.current.precip + '% chance of rain.');
    };    
    }); 
};


module.exports = forecast;