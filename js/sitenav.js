$(function(){

    // 商城链接渲染
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getsitenav",
        dataType: "json",
        success: function(info){
            // console.log(info);
            var navlistStr = template("navlist", info);
            $('.mmb_sitenav .navBox').html( navlistStr );
        }
    });
});