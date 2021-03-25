const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const weathStackUrl = 'http://api.weatherstack.com/current?access_key=82e7656481e5ca55d7c69a4619cfc58a&query=' + latitude + ',' + longitude + '&units=f'
    request({ url: weathStackUrl, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather app', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const data = {
                weather_descriptions: body.current.weather_descriptions,
                currentTemperature: body.current.temperature,
                feelslike: body.current.feelslike
            }
            callback(undefined, data)
        }
    })
}

module.exports = forecast
