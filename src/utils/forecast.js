const request = require('request')

const forecast = (latitude, longitude, callback) => {
   
    const url = 'http://api.weatherstack.com/current?access_key=2b6d550789254e56f6d5fadb50f7c448&query='+ latitude +',' + longitude +'&units=f'

    request({ url, json: true },(error, {body})=>{
        
        if(error){
            callback('Unable to connect to weather service.', undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)
        } else{
            
            const temp = body.current.temperature
            const feelLike = body.current.feelslike
            const weather = body.current.weather_descriptions[0]

            const humidity = body.current.humidity

            callback(undefined,weather + '. It is currently '+temp+' degrees out. It feels like '+feelLike+' degrees out.' +
            ' The humidity is ' +  humidity + '%.')
        }
    })

}

module.exports = forecast