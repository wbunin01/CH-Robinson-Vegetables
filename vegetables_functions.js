//Populates the content section on the index page
function fill_content_home(){
	//if local storage user_cart has not been set, then this sets each amount to 0
	if (localStorage["user_cart"] == undefined){
		var user_cart = [];
		for(var i = 0; i<vegetables.length; i++){
			user_cart[i] = 0;
		}
		
		localStorage["user_cart"] = JSON.stringify(user_cart);
	}
	

	var out = "We offer a variety of vegetables that you can purchase at this time.<br><br>";
	out+= "<form id='vegetable_form'>";
	
	//list out each item by name, price, and description along with the ability to add a number of that item to the cart.
	for(var i = 0; i < vegetables.length; i++){
		out+=	vegetables[i].vegetable_name + " cost: $" +  vegetables[i].price + "<br>";
		out+=	"How many of this item would you like to add to your purchase? <input type='number' min='1' name='vegetable" + i + "_amount' id='vegetable" + i + "_amount'><br><br>";
		out+=	vegetables[i].description + "<br><hr>";
		out+= "<br>";
	}
	out +="<input type='button' onclick='update_user_cart()' value='Update Cart'></form>"
	
	document.getElementById("content").innerHTML = out;
}

//adds to the users cart what the user entered in.
function update_user_cart(){
	var user_cart = JSON.parse(localStorage["user_cart"]);
	
	for(var i = 0; i<vegetables.length; i++){
		if(document.getElementById("vegetable"+i+"_amount").value < 0){
			user_cart[i] = 0;
		} else {
			user_cart[i] = Math.floor(Number(user_cart[i]) + Number(document.getElementById("vegetable"+i+"_amount").value));
		}
	}
	
	localStorage["user_cart"] = JSON.stringify(user_cart);
	alert("Your cart has been updated");
	location.reload();
}

//populates the content section on the my_cart page (for more information on what's going on in this section, see fill conete home.)
function fill_content_my_cart(){
	if (localStorage["user_cart"] == undefined){
		var user_cart = [];
		for(var i = 0; i<vegetables.length; i++){
			user_cart[i] = 0;
		}
		
		localStorage["user_cart"] = JSON.stringify(user_cart);
	}
	
	var user_cart = JSON.parse(localStorage["user_cart"]);

	var out = "Here is what's in your current cart.<br><br>";
	out+= "<form id='cart_form'>";
	var total_price = 0;
	for(var i = 0; i < vegetables.length; i++){
		out+=	vegetables[i].vegetable_name + " - Amount in cart: " +user_cart[i] +".<br>";
		out+=	"If you would like this number to be changed, then what should this number be changed to? <input type='number' min='1' name='vegetable" + i + "_amount' id='vegetable" + i + "_amount' value='"+user_cart[i]+"'><br><br><hr>";
		out+= "<br>";
		total_price = Number(Number(total_price) + Number(user_cart[i]*vegetables[i].price));
	}
	total_price = total_price.toFixed(2)
	out +="Total cost: $"+total_price+"<br><br><hr><br>";
	out +="<input type='button' onclick='set_user_cart()' value='Update Cart'>";
	out +="<input type='button' onclick='checkout()' value='Checkout'></form>"
	
	document.getElementById("content").innerHTML = out;
}

//sets the cart to match what the user changed their cart to be
function set_user_cart(){
	var user_cart = JSON.parse(localStorage["user_cart"]);
	
	for(var i = 0; i<vegetables.length; i++){
		if(document.getElementById("vegetable"+i+"_amount").value < 0){
			user_cart[i] = 0;
		} else {
			user_cart[i] = Math.floor(Number(document.getElementById("vegetable"+i+"_amount").value));
		}
	}
	
	localStorage["user_cart"] = JSON.stringify(user_cart);
	alert("Your cart has been updated");
	location.reload();
}

//changes the page to the checkout page and resets the users cart
function checkout(){
	var user_cart = JSON.parse(localStorage["user_cart"]);
	
	for(var i = 0; i<vegetables.length; i++){
		user_cart[i] = 0;
	}
	
	localStorage["user_cart"] = JSON.stringify(user_cart);
	window.location.href='./checkout.html';
}
