$(function(){

    $.ajax({
        type: "get",
        url: "http://127.0.0.1:9090/api/getbrandtitle",
        dataType: "json",
        success: function(info){
            console.log(info);
            var titlelistStr = template("titlelist", info);
            $('.mmb_brandTitle .titleBox').html( titlelistStr );
        }
    });
});