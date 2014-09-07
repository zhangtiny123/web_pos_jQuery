/**
 * Created by tiny on 14-9-5.
 */
$(document).ready(function(){
    refresh();
    var all_items = loadAllItems();
    var add_button = '<button class="btn btn-primary btn-lg">加入购物车</button>';
    var product_item = '';
    _.each(all_items, function(item){
        product_item =
            '<tr class="product_item" data-barcode="'+item.barcode+'">\
                <td>'+item.type+'</td>\
                <td>'+item.name+'</td>\
                <td>'+item.price+'</td>\
                <td>'+item.unit+'</td>\
                <td class="add_button">'+add_button+'</td>\
            </tr>';
        $("#product_list_body").append(product_item);
    });

    $(".add_button").on("click", function(){
        var barcode = $(this).closest(".product_item").data("barcode");
        var cart_items = JSON.parse(localStorage.cart_items);
        console.log(cart_items);
        cart_items.push(barcode);
        localStorage.cart_items = JSON.stringify(cart_items);

        refresh();
    });

    function refresh() {
        var cart_items = JSON.parse(localStorage.cart_items);
        $("#cart_count").text(cart_items.length);
    }
});