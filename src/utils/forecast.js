const request = require('request')

const forecast = (latitude ,longitude , callback)=>{
    const url = 'https://api.darksky.net/forecast/35e1d638412e0ee46399be8ea74a8087/'+latitude+','+longitude+'?units=si'
    request({url,json: true},(error,{body})=>{
        if(error){
            callback('Unable to connect to Weather!',undefined)
        }else if(body.error){
            callback('Try other coordinates',undefined)
        }
        else{
            callback(undefined,body.daily.summary+" Currently it is "+body.currently.temperature+" degree celcius.There is "+body.currently.precipProbability+"% chance of rain")
        }
    })
}

module.exports = forecast