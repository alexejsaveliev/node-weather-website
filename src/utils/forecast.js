const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/4d76d39d75c7039454373766e499363c/' + latitude + ',' + longitude + '?units=si&exclude=minutely'

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable connect to Weather service', undefined);
        } else if (body.error) {
            callback('Error '+body.code + ' ('+ body.error+')', undefined);
        } else {
            const currently = body.currently

            callback(undefined, 'It is currently ' + currently.temperature +
                ' degrees out. There is ' + currently.precipProbability + '% chance to rain. ' +
                'Min temperature is ' + body.daily.data[0].temperatureMin + ', max ' + body.daily.data[0].temperatureMax);
        }


    })
}

module.exports = forecast