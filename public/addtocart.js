var cards_containor=document.getElementsByClassName("cards_containor")[0];
var length=cards_containor.children.length

for(var i=0;i<length;i++){
  var description=cards_containor.children[i].children[4].children[1];
  description.addEventListener("click",toggleDescription);

  var deleteitem=cards_containor.children[i].children[4].children[0];
  deleteitem.addEventListener("click",removeFromCart);

  var incrementBtn=cards_containor.children[i].children[3].children[1];
  incrementBtn.addEventListener("click",increment);

  var decrementBtn=cards_containor.children[i].children[3].children[2];
  decrementBtn.addEventListener("click",decrement);
}

function toggleDescription(e){
    var viewDesciption=e.target.parentNode.parentNode.children[5]
        if(viewDesciption.style.display==="block"){
            viewDesciption.style.display="none";
        }else{
            viewDesciption.style.display="block";
        }
}

function removeFromCart(e){
  var obj={
    id:e.target.getAttribute("id")
    }

    var request=new XMLHttpRequest();
    request.open("post","/removeFromCart");
    request.setRequestHeader("Content-type","application/json");
    request.send(JSON.stringify(obj));
    request.addEventListener("load",function(){
      if(request.status===200){
        window.location.href="/addToCart";
      }else{
        alert("Cart is empty please from Add Some Items");
        window.location.href="/";
      }
    })
}

function increment(e){
  var obj={
    id:e.target.getAttribute("id")
    }
  var quantity=e.target.parentNode.children[0].children[0];
  
  var request=new XMLHttpRequest();
    request.open("post","/increment");
    request.setRequestHeader("Content-type","application/json");
    request.send(JSON.stringify(obj));
    request.addEventListener("load",function(){
      if(request.status===200){
           console.log(parseInt(quantity.innerHTML)+1)
         quantity.innerHTML=parseInt(quantity.innerHTML)+1;
      }else{
        alert("Not able to increment from cart");
      }
    })
}
function decrement(e){
  var obj={
    id:e.target.getAttribute("id")
    }
  var quantity=e.target.parentNode.children[0].children[0];
  if(parseInt(quantity.innerHTML)>1){
  var request=new XMLHttpRequest();
    request.open("post","/decrement");
    request.setRequestHeader("Content-type","application/json");
    request.send(JSON.stringify(obj));
    request.addEventListener("load",function(){
      if(request.status===200){
           console.log(parseInt(quantity.innerHTML)-1)
         quantity.innerHTML=parseInt(quantity.innerHTML)-1;
      }else{
        alert("Not able to increment from cart");
      }
    })
    }
}