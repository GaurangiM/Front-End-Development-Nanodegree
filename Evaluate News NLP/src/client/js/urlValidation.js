const isValidURL = (userInput) => {
    var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(res == null)//If there's no match or nothing inputted res will be null
        return false;
    else
        return true;
  };
  
  export { isValidURL };
