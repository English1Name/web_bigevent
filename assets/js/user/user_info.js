$(function(){
    var form=layui.form
    var layer=layui.layer

    form.verify({
        nickname:function(value){
            if(value.length>6){
                return '长度必须在1~6个字符之间'
            }
        }
    })
    initUserInfo()


    function initUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status!==0){
                    return layer.msg('获取用户信息失败')
                }
                // console.log(res);
                // 调用form.val()快速为表单赋值
                form.val('formUserInfo',res.data)
            }
        })
    }

    // 重置表单得数据
    $('#btnRest').on('click',function(e){
        e.preventDefault();
        initUserInfo()
        
    })

    // 监听表单得提交事件
    $('.layui-form').on('submit',function(e){
        //阻止表单得默认提交行为
        e.preventDefault()
        //发起ajax数据请求
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data: $(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')
                window.parent.getUserInfo()
            }
        })
    })
})