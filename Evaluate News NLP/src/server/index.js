const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
// Cors for cross origin allowance
const cors = require('cors')
const bodyParser = require("body-parser");

var aylien = require("aylien_textapi"); 

const app = express()

app.use(cors());

app.use(express.static('dist'))
app.use(express.json()) // for parsing application/json

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log(__dirname)

let projectData={};

// set aylien API credentias
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY,
    });
//var AYLIENTextAPI = require('aylien_textapi');

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/results', function(req,res){
    textapi.sentiment({url:req.body.url,'mode':document}, (error,response)=>{
        if(error==null){
            projectData={
                "polarity":response.polarity,
                "subjectivity":response.subjectivity,
                "text":response.text,
                "polarity_confidence":response.polarity_confidence,
                "subjectivity_confidence":response.subjectivity_confidence
            }
            res.send(projectData);
            console.log(projectData);
        }
        else{
            console.log("Error",error);
        }
    })
})
