$(function(){
  // 获取所有的品牌标题
  $.ajax({
    url:"http://127.0.0.1:9090/api/getbrandtitle",
    success:function(data){
      console.log(data);
      var str = template("titlelist",data);
      $(".titleBox").html(str);
    }
  })

});
