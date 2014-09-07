/**
 * Created by tiny on 14-9-5.
 */
$(document).ready(function() {
    var cart_items = JSON.parse(localStorage.cart_items);
    var bought_item_list = printInventory(cart_items);
    var bought_item = '';
    var promotion_item = '';

    _.each(bought_item_list, function(item){
        if (item.promotion_number == 0) {
            bought_item =
                '<tr>\
                    <td>'+item.type+'</td>\
                    <td>'+item.name+'</td>\
                    <td>'+item.price+'</td>\
                    <td>'+item.unit+'</td>\
                    <td>'+item.count+'</td>\
                    <td>'+item.total_price+'元</td>\
                </tr>'
        }
        else {
            bought_item =
                '<tr>\
                    <td>'+item.type+'</td>\
                    <td>'+item.name+'</td>\
                    <td>'+item.price+'</td>\
                    <td>'+item.unit+'</td>\
                    <td>'+item.count+'</td>\
                    <td>'+item.total_price+'元(原价：'+item.count*item.price+'元)</td>\
                </tr>';

            promotion_item =
                '<tr>\
                    <td>'+item.type+'</td>\
                    <td>'+item.name+'</td>\
                    <td>'+item.promotion_number+'</td>\
                </tr>';
        }

        $("#bought_list_body").append(bought_item);
        if (promotion_item.length != 0) {
            $("#promotion_body").append(promotion_item);
        }

        bought_item = '';
        promotion_item = '';
    });

    $("#pay_panel_body").prepend(current_time());
    $("#cart_count").text(cart_items.length);
    $("#total_payments").text(calculate_total_payments(bought_item_list));
    $("#saved_money").text(calculate_saved_money(bought_item_list));

    $("#total_pay_button").on("click", function() {
        var stored_items = JSON.parse(localStorage.cart_items);
        stored_items = [];
        localStorage.cart_items = JSON.stringify(stored_items);
    })
});