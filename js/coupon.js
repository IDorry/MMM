$(function(){

    // 优惠券列表渲染
    $.ajax({
        type: "get",
        dataType: "json",
        url: "http://127.0.0.1:9090/api/getcoupon",
        success: function( info ){
            console.log(info);
            // 绑定模板
            var couponListStr = template("couponList", info);
            $('.mmb_coupon .couponBox').html( couponListStr );
        }
    });
});