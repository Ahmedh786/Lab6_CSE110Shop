// Script.js

window.addEventListener('DOMContentLoaded', async () => {
  // TODO
  if (localStorage.getItem("products") == null) {
    var objArray = await fetch('https://fakestoreapi.com/products');
    let text = await objArray.text();
    //console.log(text);
    localStorage.setItem("product", text);
    if (localStorage.getItem("product") === null) {
    //  console.log("OK");
    }
  }
  else {
    console.log("ALREADY HERE");
  }

});
