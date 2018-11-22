$(function(){
  //获取优惠券标题列表
  $.ajax({
    url:"http://127.0.0.1:9090/api/getcoupon",
    success:function(data){
      console.log(data);
      var str = template("couponList",data);
      $(".couponBox").html(str);
    }
  })

});