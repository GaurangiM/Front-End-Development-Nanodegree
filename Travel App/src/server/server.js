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

// Setup Server
const port=3000;
const server=app.listen(port,listening);

function listening(){
    console.log(`Server running on port: ${port}`);
}

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})


//POST route for Geonames api
app.get('/getTravelInfo/:location',function(request,response){
    const data=request.params.location;
    
    console.log(data);   

    const geoNamesAPI=async()=>{
        try{
            const result=await axios.get(`http://api.geonames.org/searchJSON?q=${data}&maxRows=10&username=gaurangiM`)
            console.log(result.data.geonames[0]);
            return result.data.geonames[0];
            //.then(res=>res.data.geonames[0]) ;
            
        }
        catch(err)
        {
            console.log("Error geo:",err);
        }
        
    }
    const darkSkyAPI=async(coords)=>{
        try{
            const weather=await axios.get(`https://api.darksky.net/forecast/ec29fc416d8cb11a64a33dd6c54b27a8/${coords.lat},${coords.lng}`)
            //console.log(weather.data.currently.temperature);
            //return weather.data.currently.temperature;
            
            .then(weather=>weather.data.currently.temperature) ;
            projectData.temp=weather.data.currently.temperature;
        }
        catch(err){
            console.log("Error dark:",err);
        }
    }

    const pixabayAPI=async (data)=>{
        try{
            const picture=await axios.get(`https://pixabay.com/api/?key=15673499-99eb954ced86f46b0b3b423b4&q=${data}&image_type=photo&category=travel`)
            //console.log(picture.data.hits[0].webformatURL);
            //return picture.data.hits[0].webformatURL;
            .then(picture=>picture.data.hits[0].webformatURL) ;
        }
        catch(err){
            console.log("Error pixa:",err);
        }
    }
        
    geoNamesAPI().then(coords=>Promise.all([darkSkyAPI(coords),pixabayAPI(data)]))
    //.then(coords=> darkSkyAPI(coords)
    //.then(pixabayAPI(data))
    .then(([temp,picture])=>({temp,picture}))
    .then(a=>response.send(a))
    .catch(err=>{
        console.log("Error server :",err);
    })
    ;
})

//GET request
app.get("/all", function(req, res) {
    console.log(projectData);
    res.send(projectData);
  });