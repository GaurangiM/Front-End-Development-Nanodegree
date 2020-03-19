//document.getElementById('submit').addEventListener('click', handleSubmit)

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    console.log(formText);
    //checkForName(formText)

    console.log("::: Form Submitted :::")
    if(Client.isValidURL(formText)){
        fetch('http://localhost:8080/results',{
        method: "POST",
        credentials: "same-origin",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({url:formText})
    })
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('polarity').innerHTML = res.polarity
        document.getElementById('subjectivity').innerHTML = res.subjectivity
        document.getElementById('pol-con').innerHTML = res.polarity_confidence
        document.getElementById('subj-con').innerHTML = res.subjectivity_confidence
    })
    }
    
}

export { handleSubmit }
