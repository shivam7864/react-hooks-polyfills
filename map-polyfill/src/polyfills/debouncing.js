function handleInput(event) {
  const value = event.target.value;
  console.log("value", value);

  const searchTermDom = document.getElementById("search");
  searchTermDom.innerText = value;
  console.log(value);
  
  makeAPICallFor(value);
}

function makeAPICallFor(data){
    console.log("searched data for",data);
    
}