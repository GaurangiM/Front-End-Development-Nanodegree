const dotenv = require('dotenv');
dotenv.config();

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express=require('express');

// Start up an instance of app
const app=express();

//For calling ext api from server
const fetch = require('node-fetch');

/* Middleware*/
const bodyParser=require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors=require('cors');
app.use(cors());
const axios = require('axios');
// Initialize the main project folder
app.use(express.static('dist'));

const apiData=getApiInfo();

// Setup Server
const port=3000;
const server=app.listen(port,listening);

function listening(){
    console.log(`Server running on port: ${port}`);
}

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.post('/getForecast',function(request,response){
    const {date,place,isFuture}=request.body;

    //API call to Geonames
    fetch(`${apiData.geoNames.baseUrl}/searchJSON?q=${place}&maxRows=10&username=${apiData.geoNames.apiKey}`)
    .then(response=>response.json())
    .then(json=>{
        const lat=json.geonames[0].lat;
        const long=json.geonames[0].lng;
        console.log(lat,long);

        //API call to Darksky
        fetch(`${apiData.darkSky.baseUrl}/forecast/${apiData.darkSky.apiKey}/${lat},${long}`)
        .then(response=>response.json())
        .then(json=>{
            const summary=json.daily.data[0].summary;
            const highTemp=json.daily.data[0].temperatureHigh;
            const lowTemp=json.daily.data[0].temperatureLow;
            console.log(summary,highTemp,lowTemp);

            //API call to Pixabay
            fetch(`${apiData.pixaBay.baseUrl}/?key=${apiData.pixaBay.apiKey}&q=${place}&image_type=photo&category=travel`)
            .then(response=>response.json())
            .then(json=>{
                const picture=json.hits[0].webformatURL;
                console.log(picture);
                const result={
                    summary: summary,
                    tempHigh: highTemp,
                    tempLow: lowTemp,
                    picture: picture
                }
                response.send(result);
            });
        });
    });

});

function getApiInfo(){
    return {
        geoNames: {
            baseUrl: 'http://api.geonames.org',
            apiKey: process.env.GEONAMES_API_KEY
        },
        darkSky: {
            baseUrl: 'https://api.darksky.net',
            apiKey: process.env.DARKSKY_API_KEY
        },
        pixaBay: {
            baseUrl: "https://pixabay.com/api",
            apiKey: process.env.PIXABAY_API_KEY
        }
    }
}
module.exports = { getApiInfo };