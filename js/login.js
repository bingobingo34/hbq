$(function () {
    //页面加载完执行,生成第一次验证码
    $(document).ready(function () {
        createCode()
    });
    let username = $("#username");
    let password = $("#password");
    let btn = $('.btn');
    let discode = $("#discode");
    let c = $('.c');

    //“换一换”按钮点击事件
    c.click(function () {
        createCode();
    })

    //创建验证码函数
    function createCode() {
        let code = "";
        let codeLength = 4; //验证码的长度
        let selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9); //所有候选组成验证码的字符

        for (let i = 0; i < codeLength; i++) {
            let charIndex = Math.floor(Math.random() * 10);
            code += selectChar[charIndex];
        }
        // 设置验证码的显示样式，并显示
        discode.css('font-family', '楷体'); //设置字体
        discode.css('letter-spacing', 5); //字体间距
        discode.css('color', '#58bc58'); //字体颜色
        discode.attr('value', code); // 显示
    }
    let obj = {};
    //用户名的正则为1-7个中文字符或者1-14个英文字母
    let userReg = /^[\u4e00-\u9fa5]{1,7}$|^[a-zA-Z]{1,14}$/;
    username.change(function () {
        let text1 = userReg.test(username.val());
        if (text1) {
            obj.reg1 = text1;
            $('.tip1').html('')
        } else {
            $('.tip1').html('用户名格式错误')
        }
        yanzheng();
    })

    //密码的正则为长度在6~12之间，只能包含字母、数字和下划线
    let pwReg = /^\w{6,12}$/;
    password.change(function () {
        let text2 = pwReg.test(password.val());
        if (text2) {
            obj.reg2 = text2;
            $('.tip2').html('')
        } else {
            $('.tip2').html('密码格式错误')
        }
        yanzheng()
    })
    $('#id_code').change(function () {
        if ($('#id_code').val() == discode.val()) {
            obj.reg3 = true
            $('.tip3').html('')
        } else {
            $('.tip3').html('验证码错误')
        }
        yanzheng()
    })

    //获取注册表内元素
    function yanzheng() {
        if (obj.reg1 && obj.reg2 && obj.reg3) {
            btn.prop('disabled', false);
        } else {
            btn.prop('disabled', true);
        }
    }

    btn.click(function () {
        $.ajax({
            url: '../api/login.php',
            method: 'post',
            data: {
                username: username.val(),
                password: password.val()
            },
            success: function (res) {
                res = JSON.parse(res);
                console.log(res.code);
                if (res.code == 0) {
                    alert('用户名或密码错误，请重新输入');
                    username.val('');
                    password.val('');
                }
                if (res.code == 1) {
                    alert('登录成功');
                    $.cookie('login', username.val());
                    let url = localStorage.getItem('url');
                    if (url) {
                        location.href = url;
                        localStorage.removeItem('url');
                    } else {
                        location.href = '../index.html';
                    }
                }
            }
        })
    })
})