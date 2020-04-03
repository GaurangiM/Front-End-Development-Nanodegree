
    
        const submit=document.getElementById("sub-btn");
        console.log(submit);
        if(submit){
        document.getElementById("sub-btn").addEventListener('click',()=>{
        const location=document.getElementById("location").value;
        console.log(location);
        updateInfo();
    });
    
    

    const updateInfo=async()=>{
        console.log("updateInfo");
        const data=await getInfo();
        console.log(data);
        document.getElementById("output").innerHTML=data.temp+"&deg";
        document.getElementById("photo").src=data.picture;
    }

    const getInfo= async () =>{
        const loc=document.getElementById("location");
        
        try{
            const result=await fetch(`http://localhost:3000/getTravelInfo/`+loc.value);
            console.log(result);
            if(result.ok){
                console.log("heel")
                return await result.json().then(e => e);
            }
            
        }
        catch(err)
        {
            console.log("Error app:",err);
        }
}
}

//export {buttonEvent}
