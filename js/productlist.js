$(function(){
    // 获取地址栏商品id
    var categoryid = getUrlId( "categoryid" ) || 1;
    // 页面数据条数
    var pagesize;
    // 总数据条数
    var totalCount;
    // 计算一共有几页
    var pageCount;
    // console.log(categoryid);
    // 1. 根据分类id获取分类标题
    $.ajax({
        type: "get",
        dataType: "json",
        url: "http://127.0.0.1:9090/api/getcategorybyid",
        data: {categoryid: categoryid},
        success: function( info ){
            console.log(info);
            var htmlStr = template("getcategorybyid", info);
            $('.mmb_productlist .three').html( htmlStr );
        }
    });


    // 2. 渲染页面内容
        // 根据商品列表总数，渲染分页标签的页数
    function render( currentPage ){
        currentPage = currentPage || 1;
        $.ajax({
            type: "get",
            dataType: "json",
            url: "http://127.0.0.1:9090/api/getproductlist",
            data: {
                categoryid: categoryid,
                pageid: currentPage
            },
            success: function( info ){
                console.log(info);
                // 获取页面数据条数和总条数
                // console.log(info.pagesize);
                // pagesize = info.pagesize;
                // console.log(info.totalCount);
                // totalCount = info.totalCount;
                // 计算一共有几页
                pageCount = Math.ceil( info.totalCount / info.pagesize );
                // 模板引擎
                var htmlStr = template("productlist", info);
                $('.proItemBox').html( htmlStr );

                var htmlStr = template("pageCount", {pageCount: pageCount});
                $('.currPage .morePage').html( htmlStr );


            }
        });
    }

    render();

    // 进入页面渲染后，当前页为1
    var currentPage = 1;
    var $prev = $('.paging .prev');
    var $next = $('.paging .next');
    // 1/3的那个框
    var $curr = $('.paging .currPage');


  //点击下一页按钮，将当前页数+1，重新渲染页面
    $next.on("click", function(){
        currentPage++;
        // console.log(currentPage);
        // console.log(pageCount);
        if( currentPage >= pageCount ){
            currentPage = pageCount;
            // $(this).toggleClass("mui-disabled").next(".next").toggleClass("mui-disabled");
        }
        
        render( currentPage );
    });
    //点击上一页按钮，将当前页数-1，重新渲染页面
    $prev.on("click", function(){
        currentPage--;
        // console.log(currentPage);
        // console.log(pageCount);
        if( currentPage <= 0 ){
            currentPage = 1;
            // $(this).toggleClass("mui-disabled").next(".prev").toggleClass("mui-disabled");            
        }
        render( currentPage );
    }); 
    
    // 点击当前页(1/3的那个框)，切换分页标签(下面的ul的显示与隐藏)
    $curr.on("click", function(){
        $(this).find('.morePage').toggle();
        // toggle()----切换状态
    });

    // 点击显示出来的页数列表的项，跳转到对应页数，重新渲染这个页面
    $curr.on("click", ".morePage li", function(){
        // console.log(111);
        // 点击后，记录点击的哪一页
        currentPage = $(this).index() + 1;
        $(this).parent().siblings('span').text( $(this).text() );
        // console.log(currentPage);
        render(currentPage);
    });



});