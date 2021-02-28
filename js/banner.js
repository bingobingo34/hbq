$(function () {
    //获取元素
    let btns = $('.banner ol li');
    let ul = $('.banner ul');
    let imgs = ul.find('li');

    //当前图片的下标
    let i = 0;
    //给所有的按钮添加点击事件
    btns.click(function () {
        i = $(this).index();
        change();
    })

    //启用定时器
    let timer = setInterval(function () {
        i++;
        change()
    }, 2500)

    //添加鼠标移入移出事件
    $('.banner').mouseenter(function () {
        clearInterval(timer);
    }).mouseleave(function () {
        timer = setInterval(function () {
            i++;
            change()
        }, 2500)
    })

    function change() {
        btns.attr('class', '').eq(i).attr('class', 'active');
        if (i == btns.length) {
            btns.eq(0).attr('class', 'active');
        }
        ul.animate({
            left: i * -1200
        }, 1000, function () {
            //判断是否为最后一张图片 
            if (i == btns.length) {
                i = 0;
                ul.css('left', 0);
            }
        })
    }
})