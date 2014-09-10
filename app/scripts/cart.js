/**
 * Created by tiny on 14-9-5.
 */
$(document).ready(function(){
    var cart_items = JSON.parse(localStorage.cart_items);
    if (cart_items.length != 0){
        var item_list = printInventory(cart_items);
        var item_string = '';

        _.each(item_list, function(item) {
            if(item.promotion_number == 0){
                item_string =
                    '<tr class="cart_item" data-barcode="'+item.barcode+'">\
                <td>'+item.type+'</td>\
                <td>'+item.name+'</td>\
                <td>'+item.price+'</td>\
                <td>'+item.unit+'</td>\
                <td>\
                    <div class="btn-group">\
                    <button class="btn btn-default count_minus">-</button>\
                    <button class="btn btn-default count_value" disabled="disabled">'+item.count+'</button>\
                    <button class="btn btn-default count_add">+</button>\
                    </div>\
                </td>\
                <td class="item_price">'+item.total_price+'</td>\
            </tr>';
            }
            else{
                item_string =
                    '<tr class="cart_item" data-barcode="'+item.barcode+'">\
                <td>'+item.type+'</td>\
                <td>'+item.name+'</td>\
                <td>'+item.price+'</td>\
                <td>'+item.unit+'</td>\
                <td>\
                    <div class="btn-group">\
                    <button class="btn btn-default count_minus">-</button>\
                    <button class="btn btn-default count_value" disabled="disabled">'+item.count+'</button>\
                    <button class="btn btn-default count_add">+</button>\
                    </div>\
                </td>\
                <td class="item_price">'+item.total_price+'元(原价：'+item.price*item.count+'元)'+'</td>\
            </tr>';
            }

            $("#cart_item_body").append(item_string);

        });
        var panel_tail =
            '<div class="my_panel_tail">\
                <span>总计：<span id="total_payments">0.00</span>元</span>\
                <p><a id="pay_button" class="btn btn-primary btn-lg" href="pay_page.html">付款</a></p>\
            </div>';
        $("#cart_panel").append(panel_tail);
        $("#cart_count").text(cart_items.length);
        $("#total_payments").text(calculate_total_payments(item_list));
    }
    else {
        var empty_message =
            '<div class="my_empty_message">\
                <p>购物车为空</p>\
            </div>';
        $("#main_cart_panel").append(empty_message);
    }



    $(".count_minus").on("click", function() {
        var barcode = $(this).closest(".cart_item").data("barcode");
        var stored_items = JSON.parse(localStorage.cart_items);
        stored_items.splice(stored_items.indexOf(barcode), 1);
        localStorage.cart_items = JSON.stringify(stored_items);

        refresh(this);
    });

    $(".count_add").on("click", function() {
        var barcode = $(this).closest(".cart_item").data("barcode");
        var stored_items = JSON.parse(localStorage.cart_items);
        stored_items.push(barcode);
        localStorage.cart_items = JSON.stringify(stored_items);

        refresh(this);
    });


    function refresh(location_string){
        var cart_items = JSON.parse(localStorage.cart_items);
        if (cart_items != 0) {
            var bought_item_list = printInventory(cart_items);
            var total_price_text;
            var clicked_barcode = $(location_string).closest(".cart_item").data("barcode");
            var clicked_item = _.find(bought_item_list, function(item) {
                return item.barcode == clicked_barcode;
            });
            if(clicked_item != undefined) {
                $(location_string).closest(".cart_item").find(".count_value").text(clicked_item.count);
                if(clicked_item.promotion_number != 0) {
                    total_price_text = clicked_item.total_price + '(原价：'+clicked_item.price*clicked_item.count+')';
                }
                else {
                    total_price_text = clicked_item.total_price;
                }
                $(location_string).closest(".cart_item").find(".item_price").text(total_price_text);
            }
            else {
                $(location_string).closest(".cart_item").remove();
            }



            $("#cart_count").text(cart_items.length);
            $("#total_payments").text(calculate_total_payments(bought_item_list));
        }
        else {
            window.location.href='../views/product_list.html';
        }


    }
});