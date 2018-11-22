$(function(){
  //获取所有商城导航的列表信息
  $.ajax({
    url:"http://127.0.0.1:9090/api/getsitenav",
    success:function(data){
      console.log(data);
      var str = template("navlist",data);
      $(".navBox").html(str);
    }
  })

});