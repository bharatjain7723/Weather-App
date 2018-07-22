const yargs = require('yargs');
const axios = require('axios');

const API_KEY = '74aebb7a434b18652c9bbfdec94f51f4';

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'To fetch weather for',
            string: true
        },
        d:{
            demand: false,
            alias: 'default',
            describe: 'Default location to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

    // var requiredAddress = argv.default;

    if(argv.address !== ""){
        requiredAddress = argv.address;
    }

    var encodedAddress = encodeURIComponent(requiredAddress);
    var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

    axios.get(geocodeURL).then((response) => {
        if(response.data.status === 'ZERO_RESULTS'){
            throw new Error('Unable to find that address');
        }

        var lat = response.data.results[0].geometry.location.lat;
        var long = response.data.results[0].geometry.location.lng;

        var weatherURL =  `https://api.darksky.net/forecast/${API_KEY}/${lat},${long}`
        console.log(response.data.results[0].formatted_address);
        return axios.get(weatherURL).then((weatherResponse) => {
            var temperature = weatherResponse.data.currently.temperature;
            var apparentTemperature = weatherResponse.data.currently.apparentTemperature; 
            var convertInDegreeCelcius = (tempFahr) => ((5*(tempFahr -32))/9).toFixed(2);
            console.log(`It is ${convertInDegreeCelcius(temperature)}\xB0C. It feels like ${convertInDegreeCelcius(apparentTemperature)}\xB0C.`);   
        })
    }).catch((e)=> {
        if(e.code === 'ENOTFOUND'){
            console.log("Unable to conncet to API servers");
        }        
        else{
            console.log(e.message);
        }
    });
