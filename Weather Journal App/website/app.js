/* Global Variables */
let baseUrl='http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey='86450ece919a6f5095dea1e4fcf3291b';
let addApi='&units=metric&APPID=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Add event listener to Generate button
document.getElementById('generate').addEventListener('click',generateWeather);

//Get request to Openweathermap api
const getWeatherData=async (baseUrl,zipCode,addApi,apiKey)=>{
    const res=await fetch(baseUrl+zipCode+addApi+apiKey)
    try{
        const data=await res.json();
        console.log(data);
        return data;
    }catch(error){
        console.log("error",error);
        
    }
}

//Post request to add api data & user data to app
const postWeatherData=async (url='',data={})=>{
    const response=await fetch(url,{
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });
    try{
        const newData=await response.json();
        return newData
    }catch(error){
        console.log("error",error);
    }
    
}

//Get request to fetch data from api and update UI dynamically
const updateUI=async ()=>{
    const request=await fetch('/all');
    try{
        const finalData=await request.json();
        document.getElementById('date').innerHTML="Date: "+finalData.date;
        document.getElementById('temp').innerHTML="Temperature: "+finalData.temp+"&deg;C";
        document.getElementById('content').innerHTML="Feelings: "+finalData.feelings;
    }catch(error){
        console.log("error",error);
    };
}



function generateWeather(){
    const zipCode=document.getElementById('zip').value;
    const feelings=document.getElementById('feelings').value;
    getWeatherData(baseUrl,zipCode,addApi,apiKey)
    .then(function(data){
        postWeatherData('/addWeather',{temp: data.main.temp, date: newDate, feelings: feelings});
    }).then(function(data){
        updateUI()
    })
}



