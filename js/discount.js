$(function(){

    // 根据商品id，（地址栏获取），获取国内折扣商品数据，渲染到页面
    var productid = getUrlId("productid") || 20;
    // console.log(productid);
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getdiscountproduct",
        dataType: "json",
        data: {
            productid: productid
        },
        success: function(info){
            console.log(info);

            // 商品渲染
            var discountStr = template("discount", info);
            $('.mmb_discount').html( discountStr );

            // 额外内容渲染
            var extraStr = template("extra", info);
            $('.mmb_extra').html( extraStr );
        }
    });
    
});