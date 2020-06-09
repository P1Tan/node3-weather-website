const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4a9bfeb36ee352fe21af18977d2734f8&query=' + latitude + ',' + longitude + '&units=f'
    request({url, json: true},(error, {body}) => {
        if(error){
            callback('Unable to connect to location services', undefined)
        } else if (body.error){
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, console.log(body.current.weather_descriptions[0] + '. It is currently '+ body.current.temperature + ' degrees out. It feels like it is '+body.current.feelslike+' degrees.'))
    }
    })
}

module.exports = forecast