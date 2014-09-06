/**
 * Created by tiny on 14-9-5.
 */
$(document).ready(function(){
    var cart_items = JSON.parse(localStorage.cart_items);
    var item_list = printInventory(cart_items);
    var item_string = '';

    _.each(item_list, function(item) {
        item_string =
            '<tr class="product_item" data-barcode="'+item.barcode+'">\
                <td>'+item.type+'</td>\
                <td>'+item.name+'</td>\
                <td>'+item.price+'</td>\
                <td>'+item.unit+'</td>\
                <td>'+item.count+'</td>\
                <td>'+item.total_price+'</td>\
            </tr>';
        $("#cart_item_body").append(item_string);
    })
});