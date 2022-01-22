$(function(){
    //点击去注册账号 链接
    $('#link_reg').on('click',function(){
        $('.login-box').hide();
        $('.reg-box').show();
    })

    //点击去登陆链接
    $('#link_login').on('click',function(){
        $('.login-box').show();
        $('.reg-box').hide()
    })

    //从layui中获取from对象
    var form=layui.form
    var layer=layui.layer
    form.verify({
        //自定义了一个叫做pwd 得 校验规则
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        repwd:function(value){
            //通过形参拿到得是确认密码框得内容
            //还需要拿到密码框中得内容
            //然后进行一次等于得判断
            //如果判断失败了 则return出去 提示消息
            var pwd=$('.reg-box [name=password]').val()
            if(pwd!==value){
                return'两次密码不一致'
            }
        }
    })

    //监听注册表单得提交事件
    $('#form_reg').on('submit',function(e){
        //阻止表单得默认行为
        e.preventDefault();
        $.post('/api/reguser',
        {username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()},
            function(res){
                if (res.status!==0){
                    // return console.log(res.message);
                    return layer.msg('注册失败');
                }
                // console.log('注册成功！');
                layer.msg('注册成功！');
                //模拟人的点击行为
                $('#link_login').click()
        })
    })

    //监听登录表单得登陆事件
    $('#form_login').submit(function(e){
        //阻止默认行为
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                //将登录成功得字符串保存到 localAstorage中
                localStorage.setItem('token',res.token)
                console.log(res.token);
                location.href='/index.html'
            }
        })
    })
})