var error=document.getElementById("wrong");
var success=document.getElementById("success");


if(error){
  setTimeout(function(){
   error.style.display="none";
},5000)
}
if(success){
  setTimeout(function(){
   success.style.display="none";
},5000)
}