var cardsContainor=document.getElementsByClassName("cards_Containor")[0];
var allcards=cardsContainor.children;

// description listner

for(var j=0;j<allcards.length;j++){

    var updateBtns=allcards[j].children[5].children[0];
    updateBtns.addEventListener("click",update);

    var deleteBtns=allcards[j].children[5].children[1];
    deleteBtns.addEventListener("click",deleteBtn);

}

function update(e){
   var obj={
    id:e.target.id
  }
  console.log(obj.id);

   var request=new XMLHttpRequest();
    request.open("post","/admin/updateProduct");
    request.setRequestHeader("Content-type","application/json");
    request.send(JSON.stringify(obj));
    request.addEventListener("load",function(){
        if(request.status===200){
             window.location.href="/admin/updateItem"; 
        }else if(request.status===404){
             alert("Not able to delete ");
             window.location.href="/admin/adminpage1";
        }
    })
}
function deleteBtn(e){
  var obj={
    id:e.target.id
  }
  console.log(obj.id);

   var request=new XMLHttpRequest();
    request.open("post","/admin/delete");
    request.setRequestHeader("Content-type","application/json");
    request.send(JSON.stringify(obj));
    request.addEventListener("load",function(){
        if(request.status===200){
              
        }else if(request.status===404){
             alert("Not able to delete ");
        }
        window.location.href="/admin/adminpage1";
    })
}