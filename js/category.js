$(function(){
  //获取分类标题数据渲染到页面中
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getcategorytitle",
        dataType: "json",
        success: function(info) {
            console.log(info);
            // 模板引擎
            var htmlStr = template("cateTitle_tpl", info);
            $('.itemBox').html( htmlStr );

            // 点击分类标题，发送ajax请求，获取二级分类数据，渲染到页面
            $('.item').on("click", "a", function(){
                // console.log(111);
                var $that = $(this);
                
                $.ajax({
                    type: "get",
                    url: "http://127.0.0.1:9090/api/getcategory",
                    dataType: "json",
                    data: {
                        titleid: $(this).data("titleid")
                    },
                    success: function( info ){
                        console.log(info);
                        var htmlStr = template("cateContent_tpl", info);
                        $that.next().html( htmlStr );
                        $that.next().stop().slideToggle();
                        $that.parent().siblings().find('ul').stop().slideUp();
                    }
                });
            });
        }
    });  
  

});