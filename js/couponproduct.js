$(function(){

    // 获取优惠券标题id
    var couponid = getUrlId("couponid");
    var src;
    var srcAll = [];

    // 左右箭头
    var $arr_left = $('.mmb_mask .arr_left');
    var $arr_right = $('.mmb_mask .arr_right');

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

            // 保存所有图片
            // console.log(info.result);
            for(i=0;i<=info.result.length;i++){
                // srcAll.push( info.result[i]["couponProductImg"] );
                
            }
            console.log(srcAll);
        }
    });

    // 当点击列表项的时候，弹出模态框
    $(".couproBox").on("click", ".couproList", function(){
        // 获取保存被点击项的图片
        src = $(this).find("a .img img").attr("src");
        console.log(src);
        // 将获取到的图片  给  模态框上的图片
        $('.mmb_mask .mask_img').find("img").attr("src", src);
        // 让模态框显示
        $('.mmb_mask').show();
    });

    // 点击模态框的delete按钮时，关闭模态框
    $(".delete").click(function(){
        $('.mmb_mask').hide();
        // 把模态框的图片清空
        $(this).prev().attr("src", "");
    });


    // 点击模态框的左箭头，显示上一张图片
    $arr_left.click(function(){
        console.log(1111);
    });

});