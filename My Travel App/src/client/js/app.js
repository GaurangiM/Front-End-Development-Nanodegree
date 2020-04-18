const submit_btn=document.getElementById("button");
if(submit_btn){
    submit_btn.addEventListener("click",()=>{
        event.preventDefault();
        const depart_date=document.getElementById("date1").value;
        const return_date=document.getElementById("date2").value;
        const loc=document.getElementById("location").value;

        //calculate difference between departure date and current date
        const today=new Date();
        const timeDiff=new Date(depart_date).getTime()-today.getTime();
        const daysDiff=getDaysDiff(today,depart_date);/*timeDiff/(1000*3600*24);*/
        console.log(daysDiff);
        const isFuture=daysDiff>7;
        console.log(isFuture);
        const trip_length=getDaysDiff(depart_date,return_date);    /*(new Date(return_date)-new Date(depart_date))/(1000*3600*24);*/
        console.log(trip_length);
        const inputData={
            place:loc,
            date: depart_date,
            isFuture: isFuture,
            daysAhead: daysDiff
        };

        geoNamesAPI(inputData)
        .then(async(result)=>{
            try{
                const data=await result.json();
                document.getElementById("place").innerHTML=loc;
                document.getElementById("depart").innerHTML=depart_date;
                document.getElementById("return").innerHTML=return_date;
                document.getElementById("trip-length").innerHTML=trip_length+1;
                document.getElementById("temp").innerHTML=data.summary;
                document.getElementById("tempHigh").innerHTML=data.tempHigh;
                document.getElementById("tempLow").innerHTML=data.tempLow;
                document.getElementById("picture").src=data.picture;
            }
            catch(error){
                console.log("Error",error);
            }
        });


        
    })
}

const geoNamesAPI= async(data)=>{
    return await fetch('http://localhost:3000/getForecast',{
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data),
    });
}

function getDaysDiff(date1,date2){
    let timeDiff=new Date(date2).getTime()-new Date(date1).getTime();
    return Math.round(timeDiff/(1000*3600*24));
}

module.exports = { getDaysDiff };