// Script.js

myStorage = window.localStorage;

window.addEventListener('DOMContentLoaded', () => {
  let URL = "https://fakestoreapi.com/products"
  fetch(URL).then(resp=>resp.json()).then(function(resp){
    console.log(resp)
    myStorage.setItem("stringArray", JSON.stringify(resp));
  });
  let obj = myStorage.getItem("stringArray");
  var stringify = JSON.parse(obj);
  var cartCounter = document.getElementById('cart-count')
  var dict = {};
  for(let i = 0; i < stringify.length; i++){
    dict[stringify[i]['id']] = false
    dict['cartNum'] = 0;
  } 
  if(!(myStorage.getItem('buyingInfo') === null)){
    var buyInfo = JSON.parse(myStorage.getItem('buyingInfo'));  
    dict = buyInfo; 
    cartCounter.textContent = dict['cartNum']
    console.log(dict) 
  }
  console.log(dict)
  var isBought = false;
  // create a new storage thing, tracking whats already bought
  // create buttons normally, except for ones already bought.
  //{"bought":[], "total items":9}
  
  for (var i = 0; i < stringify.length; i++) {
    let item = document.createElement('product-item');
    item.id = stringify[i]['id']
    let img = item.shadowRoot.querySelector("img");
    img.src = stringify[i]['image'];
    let p1 = item.shadowRoot.querySelector(".title");
    p1.innerText = stringify[i]['title'];
    //p1.textContent = stringify[i]['title'];
    let p2 = item.shadowRoot.querySelector(".price");
    p2.innerText = stringify[i]['price'];
    //p2.textContent = stringify[i]['price'];
    let button = item.shadowRoot.querySelector("button");
    button.id = stringify[i]['id']
    if(dict[button.id] == false){
      button.textContent = "Add to Cart"
    } else {
      button.textContent = "Remove from Cart"
    }
    button.addEventListener("click", ()=> {
      if(dict[button.id] == false){
        alert('Added to Cart!')
        cartCounter.textContent++ // fetch the count + 1
        button.textContent = "Remove from Cart"
        dict[button.id] = true;
        dict['cartNum']++
        //console.log(dict[button.parentElement.id])
      } else { 
        alert('Removed from Cart!')
        cartCounter.textContent-- // fetch the count + 1
        button.textContent = "Add to Cart"
        dict[button.id] = false;
        dict['cartNum']--
      }
      myStorage.setItem('buyingInfo', JSON.stringify(dict))
      console.log(myStorage.getItem('buyingInfo'))
    });
    var container = document.getElementById("product-list");
    container.append(item);
  }
});

