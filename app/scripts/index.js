function cart_count(){
    var cart_items = JSON.parse(localStorage.cart_items);
    return cart_items.length;
}

$(document).ready(function(){
    localStorage.cart_items || (localStorage.cart_items = "[]");
    $("#cart_count").text(cart_count());
    });