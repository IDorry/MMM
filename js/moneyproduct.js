$(function(){

    // 根据商品id，（地址栏获取），获取折扣商品数据，渲染到页面
    var productid = getUrlId("productid") || 20;
    // console.log(productid);
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getmoneyctrlproduct",
        dataType: "json",
        data: {
            productid: productid
        },
        success: function(info){
            console.log(info);

            // 商品渲染
            var moneyproductStr = template("moneyproduct", info);
            $('.mmb_moneyproduct').html( moneyproductStr );

            // 额外内容渲染
            var extraStr = template("extra", info);
            $('.mmb_extra').html( extraStr );
        }
    });
    
});