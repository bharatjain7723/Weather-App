const request = require('request');

const API_KEY = '74aebb7a434b18652c9bbfdec94f51f4';

var getWeather = (lat, long, callback) =>{
    request({
        url: `https://api.darksky.net/forecast/${API_KEY}/${lat},${long}`,
        json: true
    },( error, response, body)=>{
        if(!error && response.statusCode === 200){
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }
        else{
            callback("Unable to fetch weather");
        }
    });
};

module.exports.getWeather = getWeather;