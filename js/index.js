// 动态渲染首页导航部分
$(function(){

    // 获取首页导航菜单栏数据
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getindexmenu",
        dataType: "json",
        success: function(info){
            console.log(info);
            // 用模板引擎渲染到页面
            var htmlStr = template("nav_tpl", info);
            $('.mmb_nav ul').html( htmlStr );

            // 当点击更多按钮时，切换第三行导航栏数据的显示与隐藏
            $('.mmb_nav ul').on("click", ".nav.more", function(){

                $(this).siblings(".nav.show").toggleClass("hide");           
               
            });
        }
    });

    // 获取推荐列表数据
    $.ajax({
        type: "get",
        dataType: "json",
        url: "http://127.0.0.1:9090/api/getmoneyctrl",
        success: function( info ){
            console.log(info);
            var htmlStr = template("recommend_tpl", info);
            $('.recom_content ul').html( htmlStr );
        }
    });


});