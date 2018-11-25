$(function(){

    // 获取优惠券标题id
    var couponid = getUrlId("couponid");
    var src;

    // 1. 渲染商品列表
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getcouponproduct",
        dataType: "json",
        data: {
            couponid: couponid
        },
        success: function( info ){
            console.log(info);
            // 绑定数据
            var couproListStr = template("couproList", info);
            $('.mmb_couponProduct .couproBox').html( couproListStr );
        }
    });

    // 当点击列表项的时候，弹出模态框
    $(".couproBox").on("click", ".couproList", function(){
        // 获取保存被点击项的图片
        src = $(this).find("a .img img").attr("src");
        // console.log(src);
        // 将获取到的图片  给  模态框上的图片
        $('.mmb_mask .mask_img').find("img").attr("src", src);
        // 让模态框显示
        $('.mmb_mask').show();
    });

    // 点击模态框的delete按钮时，关闭模态框
    $('.mmb_mask').on("click", ".delete", function(){
        $('.mmb_mask').hide();
        // 把模态框的图片清空
        $(this).prev().attr("src", "");
    });
});