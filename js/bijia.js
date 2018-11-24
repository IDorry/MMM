$(function(){
    
    // 1. 获取商品详情数据
    // 先获取地址栏数据---productid
    var productid = getUrlId("productid") || 1;
    console.log(productid);
    // 发送ajax
    $.ajax({
        type: "get",
        dataType: "json",
        url: "http://127.0.0.1:9090/api/getproduct",
        data: {productid: productid },
        success: function( info ){
            // console.log(info);
            // console.log(info.result[0].categoryId);
            // 商品详情
            var getproductStr = template("getproduct", info);
            $('.mmb_bijia .desc').html( getproductStr );
            // 去购买
            var goShopStr = template("goShop", info);
            $('.goShop .shopTop').html( goShopStr );

            //3.  渲染三级菜单
            // 根据分类id获取分类名称api
            // 保存分类id，截取分类名
            var categoryid = info.result[0].categoryId;
            var productName = info.result[0].productName.split(" ")[0];

            $.ajax({
                type: "get",
                dataType: "json",
                url: "http://127.0.0.1:9090/api/getcategorybyid",
                data: {
                    categoryid: categoryid
                },
                success: function(info){
                    console.log(info);
                    console.log(info.result[0].category);
                    // 三级菜单需要的信息
                    var brandObj = {
                        category: info.result[0].category,
                        productName: productName
                    };
                    // 绑定模板引擎
                    var bijiaTitleStr = template("bijiaTitle", brandObj );
                    $('.mmb_bijia .title .three').html( bijiaTitleStr );
                }
            });

        }
    });


    // 2. 商品评论
    $.ajax({
        type: "get",
        dataType: "json",
        url: "http://127.0.0.1:9090/api/getproductcom",
        data: {productid: productid},
        success: function( info ){
            // console.log(info);
            var getproductcomStr = template("getproductcom", info);
            $('.mmb_evaluate .comBox').html( getproductcomStr );
        }
    });

});