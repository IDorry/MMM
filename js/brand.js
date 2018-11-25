$(function(){

    var brandtitleid = getUrlId("brandtitleid") || 1;
    // 1. 十大品牌排行
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getbrand",
        dataType: "json",
        data: {
            brandtitleid: brandtitleid
        },
        success: function(info){
            console.log(info);
            var brandlistStr = template("brandlist", info);
            $('.mmb_brandTitle .brandBox').html( brandlistStr );
        }
    });

    // 2. 品牌id对应的商品列表
    $.ajax({
        type: "get",
        dataType: "json",
        url: "http://127.0.0.1:9090/api/getbrandproductlist",
        data: {
            brandtitleid: brandtitleid,
            pagesize: 4       //默认为4个
        },
        success: function(info){
            console.log(info);
            var salelistStr = template("salelist", info);
            $('.mmb_saleRank .saleBox').html( salelistStr );
        }
    });


    // 3. 渲染评论
    $.ajax({
        type: "get",
        dataType: "json",
        url: "http://127.0.0.1:9090/api/getproductcom",
        data: {
            productid: 0 
        },
        success: function(info){
            console.log(info);
            var comlistStr = template("comlist", info);
            $('.mmb_newCom .comBox').html( comlistStr );
        }
    });
});