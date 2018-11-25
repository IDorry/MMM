$(function(){

    var $shopid;
    var $areaid;
    // 1. 渲染商店下拉框
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getgsshop",
        dataType: "json",
        success: function( info ){
            console.log(info);
            // 绑定数据
            var shoplistStr = template("shoplist", info);
            $('.shopBox').html( shoplistStr );
        }
    });

    // 2. 渲染区域下拉框
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getgsshoparea",
        dataType: "json",
        success: function(info){
            console.log(info);
            // 绑定数据
            var arealistStr = template("arealist", info);
            $('.areaBox').html( arealistStr );
        }
    });

    // 3. 给导航栏按钮注册点击事件，被点击的项显示对应的下拉框，其他隐藏
    $('.gsnavBox').on("click", ".gsnavList", function(){
        // 记录当前被点击的想的下标
        var $index = $(this).index();

        // 让小三角向下
        $(this).find("i").css("transform","rotate(180deg)");
        $(this).siblings().find("i").css("transform","rotate(0deg)");

        // 如果小三角向下，再次点击，收起
        // if( $(this).find("i").css("transform") === "rotate(180deg)" ){

        //     $(this).find("i").css("transform","rotate(0deg)");
            
        // }
        

        // 根据下标找到对应的下拉框
        $('.select ul').eq($index).toggle();

        // 如果被点击项对应的下拉框是显示的，其他兄弟元素隐藏
        if ( $('.select ul').eq($index).css("display") === "block" ) {
            $('.select ul').eq($index).siblings().hide();           
        }
    });

    // 4. 给下拉框中的li注册点击事件，记录shopid和areaid。点击之后即发送ajax请求，获取对应的数据渲染到页面中

    $('.shopBox').on("click", "li", function(){
        // 获取id
        $shopid = $(this).data("shopid");
        // 隐藏下拉框
        $('.shopBox').hide();
        // 小三角向上
        $('.gsnavBox .gsnavList').eq(0).find("i").css("transform","rotate(0deg)");
        // 将li的文本给导航
        $('.gsnavBox .gsnavList').eq(0).find("span").text( $(this).text() );
        // 渲染商品列表
        render($shopid, $areaid);
    });

    $('.areaBox').on("click", "li", function(){
        $shopid = $(this).data("areaid");
        $('.areaBox').hide();  
        // 小三角向上
        $('.gsnavBox .gsnavList').eq(1).find("i").css("transform","rotate(0deg)");
        $('.gsnavBox .gsnavList').eq(1).find("span").text( $(this).text() );
        render($shopid, $areaid);           
    });

    $('.priceBox').on("click", "li", function(){
        $('.priceBox').hide(); 
        // 小三角向上
        $('.gsnavBox .gsnavList').eq(2).find("i").css("transform","rotate(0deg)"); 
        render(0, 0); 
    });

    // 5. 根据shopid和areaid 发送请求，获取数据
    function render( shopid, areaid ) {

        shopid = shopid || 0;
        areaid = areaid || 0;

        $.ajax({
            type: "get",
            url: "http://127.0.0.1:9090/api/getgsproduct",
            dataType: "json",
            data: {
                shopid: shopid,
                areaid: areaid 
            },
            success: function(info){
                // console.log(info);
                // 绑定数据
                var conlistStr = template("conlist", info);
                $('.mmb_gsContent .conBox').html( conlistStr );
            }
        });
    }


    // 一进页面就渲染
    render();


});