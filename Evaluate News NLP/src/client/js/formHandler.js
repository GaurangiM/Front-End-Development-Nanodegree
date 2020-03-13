function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    console.log(formText);
    if(Client.checkForName(formText))
    {
        const getData=async(url='/test',data={})=>{
            const response=await fetch(url,{

                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                credentials:'same-origin',
                body: JSON.stringify(data)
            });
            try{
                const newData=await response.json();
                console.log(newData);
                document.getElementById('results').innerHTML=newData;
                return newData;
            }catch(error){
                console.log('error',error);
                
            }
        }

        getData(undefined,{url:formText});


    }

    /*console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/test')
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = res.message
    })*/
}

export { handleSubmit }
