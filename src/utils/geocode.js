const request = require('request')

const geocode = (address, callback) => {
    const mapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        encodeURIComponent(address) +
        '.json?access_token=pk.eyJ1IjoiYW5raXQxMzEwIiwiYSI6ImNrbWY5bmo2bTBhNXIydXFoOWpyMWFpdWYifQ.yvd0kKsJFU8GKWqotK-q_Q&limit=1'

    request({ url: mapBoxUrl, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to mapBox app', undefined)
        } else if (body.features.length === 0) {
            // body.message == 'Not Found'
            // TODO check why condition 'body.features.length === 0' fails
            callback('Unable to find location. Try again with a different value', undefined)
        } else {
            const data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode
