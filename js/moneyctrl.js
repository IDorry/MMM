$(function(){

    // 页数id
    var pageid = 0;
    // 总页数
    var totalPage;
    // 分页部分
    var $prev = $('.paging .prev');
    var $next = $('.paging .next');
    // 1/3的那个框
    var $curr = $('.paging .currPage');

    render();

    // 1. 发送ajax请求，渲染商品列表
    function render( pageid ){
        pageid = pageid || 0;
        
        $.ajax({
            type: "get",
            dataType: "json",
            url: "http://127.0.0.1:9090/api/getmoneyctrl",
            data: {pageid: pageid},
            success: function(info){
                console.log(info);
                //1. 绑定模板
                var moneyctrlStr = template("moneyctrl", info);
                $('.mmb_moneyctrl .monCtrl').html( moneyctrlStr );
    
                //2. 记录总页数----显示页数
                totalPage = Math.ceil( info.totalCount / info.pagesize );
                $('.paging .currPage span').text( (pageid+1)+"/"+totalPage ); 
    
                // 3. 分页部分
                var htmlStr = template("pageCount", {pageCount: totalPage});
                $('.currPage .morePage').html( htmlStr );
    
            }
        });
    }



    //2.点击下一页按钮，将当前页数+1，重新渲染页面
    $next.on("click", function(){

        // 判断下一页是否被禁用
        if( $('.prev').hasClass("mui-disabled") ){
            $('.prev').removeClass("mui-disabled");
        }

        pageid++;

        $('.currPage span').text( pageid+"/"+totalPage );
        
        if( pageid >= totalPage ){
            pageid = totalPage-1;
            // 最后一页时，禁用下一页按钮     
            $(this).addClass("mui-disabled");
            return; 
        }
        
        render( pageid );
    });
    //3. 点击上一页按钮，将当前页数-1，重新渲染页面
    $prev.on("click", function(){

        // 判断下一页是否被禁用
        if( $('.next').hasClass("mui-disabled") ){
            $('.next').removeClass("mui-disabled");
        }

        pageid--;
        // console.log(pageid);
        // console.log(totalPage);

        if( pageid <= 0 ){
            pageid = 0;   
            // 第一页时，禁用上一页按钮  
            $(this).addClass("mui-disabled"); 
            // return;          
        }
        render( pageid );
    }); 
    
    //4. 点击当前页(1/3的那个框)，切换分页标签(下面的ul的显示与隐藏)
    $curr.on("click", function(){
        $(this).find(".morePage").toggle();
        // toggle()----切换状态
    });

    //5. 点击显示出来的页数列表的项，跳转到对应页数，重新渲染这个页面
    $curr.on("click", ".morePage li", function(){
        // console.log(111);
        // 点击后，记录点击的哪一页
        pageid = $(this).index();
        $(this).parent().siblings('span').text( $(this).text() );
        // console.log(pageid);
        render(pageid);
    });




});