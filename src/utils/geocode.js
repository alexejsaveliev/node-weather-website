const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImNqNnM2YmFoNzAwcTMzM214NTB1NHdwbnoifQ.Or19S7KmYPHW8YjRz82v6g&cachebuster=1555155374130&autocomplete=true&limit=1'

    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable connect to Geocode service', undefined)
        } else if (!body.features.length) {
            callback('Unable find location', undefined)
        } else {

            const data = {
                latitude: body.features[0].center[1], 
                longitude: body.features[0].center[0], 
                location: body.features[0].place_name
            };

            callback(undefined, data)
        }
    })
}

module.exports = geocode
