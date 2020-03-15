var path = require('path')
var AYLIENTextAPI = require('aylien_textapi');
const express = require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const dotenv = require('dotenv');
dotenv.config();
const mockAPIResponse = require('./mockAPI.js')

const projectData={};

const app = express()
app.use(express.static('dist'))
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

var textapi = new AYLIENTextAPI({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
  });



  app.post('/test',function(req,res){
    console.log(req.body);
    return textapi.sentiment({
      url:req.body.url
    },function(error,response){
      if(error==null)
      {
        projectData['polarity']=response.polarity;
        projectData['subjectivity']=response.subjectivity;
        projectData['polarity-confidence']=response.polarity-confidence;
        projectData['subjectivity-confidence']=response.subjectivity-confidence;
        console.log(projectData);
        res.send(projectData);
      }
    }

    )
  })