//注意：每次调用$get  $post $.ajax() 的时候
//会先调用这个函数
//这个函数中 我们可以拿到给ajax提供得配置对象
$.ajaxPrefilter(function(options){
    
    //发起ajax请求之前 ，统一拼接跟路径
    options.url='http://www.liulongbin.top:3007'+options.url
    console.log(options.url);
    //统一为有权限的接口，设置请求头
   if(options.url.indexOf('/my/')!==-1){
    options.headers={
        Authorization:localStorage.getItem('token')||''
    }
   }


   options.complete=function(res){
    if(res.responseJSON.status===1&&res.responseJSON.message==='身份认证失败！'){
        localStorage.removeItem('token')
        location.href='/login.html'
    }
   }
})