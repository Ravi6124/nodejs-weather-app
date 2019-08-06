const request = require('request')


const geocode = (address , callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicmF2aTYxMjQiLCJhIjoiY2p5b2k2bDg5MTUyNzNtbnRsdGk4Y3Z6bCJ9.kWP1eTyynTSPKVOuwEdU7Q&limit=1'
    request({url,json: true},(error,{body})=>{
        if(error){
            callback('Unable to connect to Weather service!',undefined)
        }else if(body.features.length===0){
            callback('Location not found. Try another search',undefined)
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode