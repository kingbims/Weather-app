const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibW9yZW1pIiwiYSI6ImNraGJ6cGNjdjAyOW4ycW1wcDRnaGxyZm0ifQ.uCWkZvN78XMlmiwT4ue7rg&limit=1';
    
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else { 
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    });
};


module.exports = geocode;