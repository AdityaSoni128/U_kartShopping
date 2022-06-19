var cardsContainor = document.getElementsByClassName("cards_Containor")[0];
var allcards = cardsContainor.children;

// description listner

for (var j = 0; j < allcards.length; j++) {
    var viewDetails = allcards[j].children[2].children[0];
    viewDetails.addEventListener("click", toggleDescription);

    var addToCartBtns = allcards[j].children[2].children[1];
    addToCartBtns.addEventListener("click", addTocart);

}

function toggleDescription(e) {
    var viewDesciption = e.target.parentNode.parentNode.children[3]
    if (viewDesciption.style.display === "block") {
        viewDesciption.style.display = "none";
    } else {
        viewDesciption.style.display = "block";
    }
}

function addTocart(e) {
    var obj = { id: e.target.getAttribute('id') };

    if (e.target.innerHTML ==="AddToCart") {
        var request = new XMLHttpRequest();
        request.open("post", "/addToCart");
        request.setRequestHeader("Content-type", "application/json");
        request.send(JSON.stringify(obj));
        request.addEventListener("load", function () {
            if (request.status === 200) {
                e.target.innerHTML = "Added";
                e.target.style.color = "blue";
                e.target.style.background = "yellow"
                console.log("added to cart");
            } else if (request.status === 401) {
                alert("Please Login First before Adding to cart");
                window.location.href = "/login";
            } else if (request.status === 409) {
                alert("Already Added to cart redirecting to cart .. ");
                window.location.href = "/addToCart";
            }else if(request.status===500){
                alert("Internal Server Error .. ");
            }
        })
    }
}

