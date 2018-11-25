$(function(){

    // 拒不滚动的导航渲染
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getbaicaijiatitle",
        dataType: "json",
        success: function(info){
            console.log(info);
            // 绑定导航栏数据
            var navListStr = template("navList", info);
            $('.mmb_bcjNav .navBox').html( navListStr );

            // 导航栏局部滚动
            new IScroll(".mmb_bcjNav", {
                scrollX: true,
                scrollY: false
            })

            // 点击导航项，高亮
            $('.mmb_bcjNav .navBox').on("click", ".navList", function(){
                $(this).addClass("active").siblings().removeClass("active");

                // 记录被点击的导航项的id---自定义属性data-后面不支持驼峰命名(会把大写字母转成小写)
                var titleid = $(this).find("a").data("titleid");
                // console.log(titleid);
                // 根据被点击项的id渲染商品列表
                $.ajax({
                    type: "get",
                    url: "http://127.0.0.1:9090/api/getbaicaijiaproduct",
                    dataType: "json",
                    data: {titleid: titleid},
                    success: function(info){
                        console.log(info);
                        // 绑定数据
                        var bcjListStr = template("bcjList", info);
                        $('.mmb_bcjContent .bcjBox').html( bcjListStr );
                    }
                });

            });

            // 页面第一次加载时，触发第一个标题的点击事件
            $('.navList').eq(0).trigger("click");

        }
    });
});