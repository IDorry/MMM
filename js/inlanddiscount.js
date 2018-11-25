$(function(){

    // 渲染商品列表
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getinlanddiscount",
        dataType: "json",
        success: function(info){
            console.log(info);
            // 绑定模板数据
            var inlanddiscountStr = template("inlanddiscount", info);
            $('.mmb_inlanddiscount .discountBox').html( inlanddiscountStr );
        }
    });
});